import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './styles/PrintModal.css';

const PrintModal = ({ isOpen, onClose, storeInfo, menuItems }) => {
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://bpclient.vercel.app/store/${storeInfo?.id || 'store'}`;
  
    const printMenu = () => {

        const printable = `
            <html>
            <head>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 1rem;
                    font-size: 11px;
                    color: #222;
                }
                h1 {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 2rem;
                }
                td {
                    width: 50%;
                    vertical-align: top;
                    padding: 0.8rem;
                    border: 1px solid #ccc;
                }
                .item-name {
                    font-weight: bold;
                    font-size: 14px;
                }
                .item-price {
                    float: right;
                    font-weight: bold;
                    color: #2c7a4b;
                }
                .item-desc {
                    font-size: 11px;
                    margin-top: 0.3rem;
                    color: #555;
                }
                .qr-code {
                    text-align: center;
                    margin-top: 0.2rem;
                }
                @media print {
                  .print-btn{
                    visibility: hidden;
                  }
                }
                </style>
            </head>
            <body>
                
            <div class="qr-code">
                <p>Scan to view online</p>
                <img src="${qrCodeURL}" alt="QR Code" />
                </div>
                <h1>${storeInfo?.name || 'My Store'} - Menu</h1>
                <button class="print-btn" onclick="window.print()">🖨 Print Now</button>
                
                <table>
                ${menuItems.reduce((html, item, idx) => {
                    if (idx % 2 === 0) html += '<tr>';
                    html += `
                    <td>
                        <div class="item-name">
                        ${item.name}
                        <span class="item-price">R${item.price}</span>
                        </div>
                        <div class="item-desc">${item.description || ''}</div>
                    </td>
                    `;
                    if (idx % 2 === 1 || idx === menuItems.length - 1) html += '</tr>';
                    return html;
                }, '')}
                </table>
            </body>
            </html>
        `;

        const win = window.open('', '', 'width=800,height=600');
        win.document.write(printable);
        win.document.close();
        };


  const printPoster = () => {
    const printable = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 2rem; background: #f8f8f8; }
            .poster { border: 2px solid #333; padding: 2rem; background: #fff; }
            img.logo { width: 100px; border-radius: 10px; }
            img.wallpaper { width: 100%; max-height: 250px; object-fit: cover; border-radius: 10px; margin: 1rem 0; }
            h1 { margin: 0.5rem 0; }
            p { margin: 0.25rem 0; }
            .qr-code {
                    text-align: center;
                    margin-top: 2rem;
                }
          </style>
        </head>
        <body>
          <div class="poster">
            <img class="logo" src="${storeInfo?.logo}" alt="Logo" />
            <h1>${storeInfo?.name || 'My Store'}</h1>
            <button class="print-btn" onclick="window.print()">🖨 Print Now</button>
            <img class="wallpaper" src="${storeInfo?.wallpaper}" alt="Wallpaper" />
            <p><strong>Contact:</strong> ${storeInfo?.contact || 'N/A'}</p>
            <p><strong>Location:</strong> ${storeInfo?.location || 'Not Set'}</p>
            <div class="qr-code">
                <p>Scan to view online</p>
                <img src="${qrCodeURL}" alt="QR Code" />
                </div>
          </div>
        </body>
      </html>
    `;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(printable);
    win.document.close();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="print-modal-backdrop" onClick={onClose}>
      <motion.div
        className="print-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3 className="print-modal-title">Print Options</h3>
        <div className="print-modal-actions">
          <button className="print-btn" onClick={printMenu}>
            <i className="fa fa-list" /> Print Menu
          </button>
          <button className="print-btn" onClick={printPoster}>
            <i className="fa fa-image" /> Print Business Poster
          </button>
        </div>
        <button className="print-close-btn" onClick={onClose}>
          <i className="fa fa-times" />
        </button>
      </motion.div>
    </div>,
    document.body
  );
};

export default PrintModal;
