<?php
/**
 * demo theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package demo_theme
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function demo_theme_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on demo theme, use a find and replace
		* to change 'demo-theme' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'demo-theme', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'demo-theme' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'demo_theme_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			// 'height'      => 250,
			// 'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'demo_theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function demo_theme_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'demo_theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'demo_theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function demo_theme_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'demo-theme' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'demo-theme' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'demo_theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function demo_theme_scripts() {
	wp_enqueue_style( 'reset-style', get_template_directory_uri() . '/reset.css' ); 
	wp_enqueue_style( 'demo-theme-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'demo-theme-style', 'rtl', 'replace' );
	wp_enqueue_style( 'my-theme-style', get_template_directory_uri() . '/my-style.css' );  

	wp_enqueue_script( 'demo-theme-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'demo_theme_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

function addPanel($wp_customize) {

	//Global Panel
	
	 $wp_customize->add_panel('global_settings', array(
	
	        'title' => 'Global Settings',
	
	        'description' => 'This is panel Description',
	
	        'priority' => 10,
	
	 ));
	
	// Header Section
	
	 $wp_customize->add_section('header_settings', array(
	
	        'title' => 'Header Settings',
	
	        'priority' => 3,
	
	        'panel' => 'global_settings',
	
	    ));
	
	$wp_customize->add_setting('header_logo', array(
		'flex-width' => true,
		'flex-height' => true,
	));
	
	$wp_customize->add_control(new \WP_Customize_Media_Control($wp_customize, 'header_logo', array(
	
		'label' => 'Header Logo',
	
		'description' => 'Preferred size 400px by 80px',
	
		'section' => 'header_settings',
	
		'settings' => 'header_logo',
	
	)));

	$wp_customize->add_setting('header_background_color', array(
		'default' => '#FFFFFF',
		'transport' => 'refresh',
	));
	
	$wp_customize->add_control(new \WP_Customize_Color_Control($wp_customize, 'header_background_color', array(
	
		'label' => 'Header Background Color',
	
		'description' => 'Set background color of header',
	
		'section' => 'header_settings',
	
		'settings' => 'header_background_color',
	
	)));

	$wp_customize->add_setting('header_text_color', array(
		'default' => '#222222',
		'transport' => 'refresh',
	));
	
	$wp_customize->add_control(new \WP_Customize_Color_Control($wp_customize, 'header_text_color', array(
	
		'label' => 'Header Navigation Items Color',
	
		'description' => 'Set color of header navigation items',
	
		'section' => 'header_settings',
	
		'settings' => 'header_text_color',
	
	)));

	$wp_customize->add_section('footer_settings', array(
	
		'title' => 'Footer Settings',

		'priority' => 3,

		'panel' => 'global_settings',

	));

	$wp_customize->add_setting('footer_logo', array(
		'flex-width' => true,
		'flex-height' => true,
	));
	
	$wp_customize->add_control(new \WP_Customize_Media_Control($wp_customize, 'footer_logo', array(
	
		'label' => 'Footer Logo',
	
		'description' => 'Preferred size 400px by 80px',
	
		'section' => 'footer_settings',
	
		'settings' => 'footer_logo',
	
	)));

	$wp_customize->add_section('main_section_settings', array(
	
		'title' => 'Main Section Settings',

		'priority' => 3,

		'panel' => 'global_settings',

	));

	$wp_customize->add_setting('main_section_hero1', array(
		'flex-width' => true,
		'flex-height' => true,
	));
	
	$wp_customize->add_control(new \WP_Customize_Media_Control($wp_customize, 'main_section_hero1', array(
	
		'label' => 'Main Section Hero 1',
	
		'description' => 'Preferred size 400px by 80px',
	
		'section' => 'main_section_settings',
	
		'settings' => 'main_section_hero1',
	
	)));

	$wp_customize->add_setting('main_section_hero2', array(
		'flex-width' => true,
		'flex-height' => true,
	));
	
	$wp_customize->add_control(new \WP_Customize_Media_Control($wp_customize, 'main_section_hero2', array(
	
		'label' => 'Main Section Hero 2',
	
		'description' => 'Preferred size 400px by 80px',
	
		'section' => 'main_section_settings',
	
		'settings' => 'main_section_hero2',
	
	)));
}	

add_action('customize_register', 'addPanel');

function create_team_post_type() {
	$labels = array(
		'name' => 'Teams',
		'singular_name' => 'Team',
		'menu_name' => 'Teams'
	);
	$args = array(
		'labels' => $labels,
		'public' => true,
		'rewrite' => array('slug' => 'team'),
		'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments')
	);
	register_post_type('team', $args);
}

add_action('init', 'create_team_post_type');

function create_team_taxonomies() {
	$labels = array(
		'name' => 'Team Category',
		'singular_name' => 'Category',
		'menu_name' => 'Category'
	);

	register_taxonomy('team_category', array('team'), array(
		'hierarchical' => true,
		'labels' => $labels,
		'rewrite' => array('slug' => 'team-category'),
	));
}

add_action('init', 'create_team_taxonomies', 0);

function custom_menus() {
	register_nav_menus(
		array(
			'footer-menu' => 'footer-menu',
			'navbar' => 'header-menu'
		)
		);
}
add_action('init', 'custom_menus');

function team_metabox() {
	add_meta_box(
		'team_metabox',
		'Team Details',
		'team_metabox_callback',
		'team',
		'advanced',
		'default'
	);
}
add_action('add_meta_boxes', 'team_metabox');

function team_metabox_callback($post) {
	wp_nonce_field(basename(__FILE__), 'team_nonce');
	$team_position = get_post_meta($post->ID, 'team_position', true);
	$team_name = get_post_meta($post->ID, 'team_name', true);
	?>

	<p>
		<label for="position" class='team-row-title'><?php _e('Position','team')?></label>
		<input type="text" name='position' id='position' value="<?php if (isset($team_position)) echo $team_position; ?> "/>
	</p>
	<p>
		<label for="name" class="team-row-title"><?php _e('Name','team')?></label>
		<input type="text" name="name" id="name" value="<?php if (isset ($team_name)) echo $team_name;?>"/>
	</p>
	<?php
}

add_action("save_post", "team_save_metabox_data", 10, 2);

function team_save_metabox_data($post_id, $post) {
	// we have verified the nonce
	if (!isset($_POST['team_nonce']) || !wp_verify_nonce($_POST['team_nonce'], basename(__FILE__))) {
		return $post_id;
	}

	//verifying slug value
	$post_slug = 'team';
	if ($post_slug != $post->post_type) {
		return;
	}

	//save value to db field
	$team_position = '';
	$team_name = '';
	if (isset($_POST['position'])) {
		$team_position = sanitize_text_field($_POST['position']);
	}
	if (isset($_POST['name'])) {
		$team_name = sanitize_text_field($_POST['name']);
	}

	update_post_meta($post_id, "team_position", $team_position);
	update_post_meta($post_id, "team_name", $team_name);
}

function post_metabox() {
	add_meta_box(
		'post_metabox',
		'Post Details',
		'post_metabox_callback',
		'post',
		'advanced',
		'default'
	);
}
add_action('add_meta_boxes', 'post_metabox');

function post_metabox_callback($post) {
	wp_nonce_field(basename(__FILE__), 'post_nonce');
	$post_eyebrow = get_post_meta($post->ID, 'post_eyebrow', true);
	$post_button = get_post_meta($post->ID, 'post_button', true);
	?>

	<p>
		<label for="eyebrow" class='post-row-title'><?php _e('eyebrow','post')?></label>
		<input type="text" name='eyebrow' id='eyebrow' value="<?php if (isset($post_eyebrow)) echo $post_eyebrow; ?> "/>
	</p>
	<p>
		<label for="button" class="post-row-title"><?php _e('button','post')?></label>
		<input type="text" name="button" id="button" value="<?php if (isset ($post_button)) echo $post_button;?>"/>
	</p>
	<?php
}

add_action("save_post", "post_save_metabox_data", 10, 2);

function post_save_metabox_data($post_id, $post) {
	// we have verified the nonce
	if (!isset($_POST['post_nonce']) || !wp_verify_nonce($_POST['post_nonce'], basename(__FILE__))) {
		return $post_id;
	}

	//verifying slug value
	$post_slug = 'post';
	if ($post_slug != $post->post_type) {
		return;
	}

	//save value to db field
	$post_eyebrow = '';
	$post_button = '';
	if (isset($_POST['eyebrow'])) {
		$post_eyebrow = sanitize_text_field($_POST['eyebrow']);
	}
	if (isset($_POST['button'])) {
		$post_button = sanitize_text_field($_POST['button']);
	}

	update_post_meta($post_id, "post_eyebrow", $post_eyebrow);
	update_post_meta($post_id, "post_button", $post_button);
}

function enqueue_my_scripts() {
	wp_enqueue_script( 'my-ajax-form', get_template_directory_uri() . '/js/my-ajax-form.js', array('jquery'), '1.0', true );
    wp_localize_script( 'my-ajax-form', 'my_ajax_form', array( 'ajaxurl' =>  admin_url( 'admin-ajax.php' ) ) );
}

add_action( 'wp_enqueue_scripts', 'enqueue_my_scripts' );

add_action( 'wp_ajax_my_action_callback', 'my_action_callback' );
add_action( 'wp_ajax_nopriv_my_action_callback', 'my_action_callback' );
function my_action_callback() {
    // Perform some action here
	$args = array(
		'post_type' => 'post',
		'orderby' => 'date',
		'order' => 'DESC',
		'posts_per_page' => 6,
		'tax_query' => array(
			array(
				'taxonomy' => 'category',
				'field' => 'name',
				'terms' => '',
				'include_children' => false,
			),
		)
		);
		$query = new WP_Query( $args );
		if ($query->have_posts()) :
		while ($query->have_posts()): $query->the_post();
			echo the_post();
		endwhile;
		endif;
    wp_die();
}

?>

