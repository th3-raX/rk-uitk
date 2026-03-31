import { useState } from 'react';
import styles from './Avatar.module.css';

/** Supported avatar sizes */
export type AvatarSize = 'sm' | 'md' | 'lg';

/** Avatar status indicator */
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'none';

/** Props for the Avatar component */
export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the avatar image */
  alt?: string;
  /** Fallback initials displayed when no image source is provided or the image fails to load */
  initials?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Online/offline status indicator */
  status?: AvatarStatus;
}

/**
 * Avatar — Displays a user's profile image with automatic fallback to initials.
 * Includes an optional status indicator dot (online/offline).
 */
export const Avatar = ({
  src,
  alt = '',
  initials,
  size = 'md',
  status = 'none',
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  const classNames = [
    styles.avatar,
    styles[`avatar--${size}`],
  ].join(' ');

  return (
    <span className={classNames} role="img" aria-label={alt || initials || 'avatar'}>
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials ?? '?'}
        </span>
      )}
      {status !== 'none' && (
        <span
          className={`${styles.status} ${styles[`status--${status}`]}`}
          aria-label={status}
        />
      )}
    </span>
  );
};
