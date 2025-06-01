import React, { useEffect, useState } from 'react';
import UserController from '../../services/UserController';

const RepliesWithUsernames = ({ replies }) => {
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const newUsernames = {};
      await Promise.all(
        replies.map(async (r) => {
          if (!usernames[r.createdBy]) {
            try {
              const name = await UserController.getUserName(r.createdBy);
              newUsernames[r.createdBy] = name || 'Anon';
            } catch {
              newUsernames[r.createdBy] = 'Anon';
            }
          }
        })
      );
      setUsernames((prev) => ({ ...prev, ...newUsernames }));
    };

    fetchUsernames();
  }, [replies]);

  return (
    <article className="reply-list">
      {replies.map((r, i) => (
        <div key={i} className="reply-item">
          <div className="reply-meta">
            <i className="fa fa-user-circle"></i>
            <strong className="reply-user">{usernames[r.createdBy] || '...'}</strong>
          </div>
          <div className="reply-message">{r.message}</div>
          <small className="reply-timestamp">{new Date(r.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </article>
  );
};

export default RepliesWithUsernames;
