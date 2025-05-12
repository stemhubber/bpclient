// PlaceAutocompleteInput.js
import React, { useEffect, useRef } from 'react';

const PlaceAutocompleteInput = ({ onPlaceSelected }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handlePlaceSelect = (e) => {
      const place = e.detail;
      if (place && place.formatted_address) {
        onPlaceSelected(place.formatted_address, place.location);
      }
    };

    el.addEventListener('gmpx-placeautocomplete:place_changed', handlePlaceSelect);
    return () => el.removeEventListener('gmpx-placeautocomplete:place_changed', handlePlaceSelect);
  }, [onPlaceSelected]);

  return (
    <gmpx-place-autocomplete
      ref={elementRef}
      style={{
        width: '100%',
        padding: '0.8rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'block',
        fontSize: '1rem',
        margin: '1rem 0',
      }}
    ></gmpx-place-autocomplete>
  );
};

export default PlaceAutocompleteInput;
