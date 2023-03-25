<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package demo_theme
 */

?>

	<footer id="colophon" class="site-footer">
	<style type="text/css">
            .site-footer  { background-color: <?php echo get_theme_mod('footer_background_color', '#325288'); ?>; }
			.menu-item a { color: <?php echo get_theme_mod('header_text_color', '#000000'); ?>; }
         </style>

		 <?php 
		 
		the_custom_logo();
		 ?>
		<div class="footer-navigation">
			<?php
				$menu_name = 'footer-menu'; //menu slug
				$locations = get_nav_menu_locations();
				$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
				$menuitems = wp_get_nav_menu_items( $menu->term_id, array( 'order' => 'DESC' ) );
				$newmenu = wp_nav_menu( array( 'theme_location'=>'footer-menu', 'container_class'=>'footer-menu' ) );
				
				print_r($newmenu);
			?>
		</div>
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'demo-theme' ) ); ?>">
				<?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', 'demo-theme' ), 'WordPress' );
				?>
			</a>
			<span class="sep"> | </span>
				<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s by %2$s.', 'demo-theme' ), 'demo-theme', '<a href="http://underscores.me/">Underscores.me</a>' );
				?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
