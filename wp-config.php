<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'gutenbergtest' );

/** MySQL database username */
define( 'DB_USER', 'pilothouse' );

/** MySQL database password */
define( 'DB_PASSWORD', 'pilothouse' );

/** MySQL hostname */
define( 'DB_HOST', 'mysql' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'DFC4?!={)b7i<HKrvBg]r VZtl%?Xo{|,:sc!0h1ugtH(tLS-0)Q_L^>[UglJK!_' );
define( 'SECURE_AUTH_KEY',   '; tU;lH?J*}wKHt65ByCD7O-iHT1$<p3RLQ)9BWc5feYJ7sQwHh;g<&I@:=:t%+R' );
define( 'LOGGED_IN_KEY',     'r;S:c)aI)d%}`_2,7YD+V/i%N}:NrcV1y;~!Vnv+.[u2q4w( WeaL*corLH;8-wU' );
define( 'NONCE_KEY',         '}rcu>X;8;QZ^?p Jeh)5cs#OvboECuqMZvw*eQS2c{yGrCqNvOjIS61P{+)l!3c&' );
define( 'AUTH_SALT',         'J5%)d{?Cfe*UMH^/xNW:wZrtn0cYuL,HDkTf((>6:lVUO~bOQv]po)QQ8Dz~y`}k' );
define( 'SECURE_AUTH_SALT',  'T~zVfQRs,!3*ykCrC7QdLNg2xNlZ_}^6C8bMPJ>-Nb9I6_L08:s;a }Q:C#QCsn:' );
define( 'LOGGED_IN_SALT',    '^r,Ft6_O;a6U(/TlMY=[*M0P],a;Qs2m.14e^&pgmj,{!re,Abww0Vl%;[V+P[D ' );
define( 'NONCE_SALT',        'nn`fD6>^JK@FZUtFqz#-(F1f:Pue{(T9#+)(oTh)Afsyv,7J4fMz8f*2&IV&}V1W' );
define( 'WP_CACHE_KEY_SALT', 'PCF=|CuAv#oa_e./Jz-+6nFD~`Tk{T/qTLd{.+l[/%b4LN!C&~F/s|<*O4):?nan' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', true );
define( 'SCRIPT_DEBUG', true );
define( 'JETPACK_DEV_DEBUG', true );
define( 'JETPACK_STAGING_MODE', true );
define( 'WP_ENV', 'development' );


$redis_server = [ 'host' => 'redis' ];


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
