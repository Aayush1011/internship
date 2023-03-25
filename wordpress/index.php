<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package demo_theme
 */

get_header();
?>

	<main id="primary" class="site-main">
		<div class="hero-section">
			<?php echo wp_get_attachment_image(get_theme_mod('main_section_hero1')); ?>
			<?php echo wp_get_attachment_image(get_theme_mod('main_section_hero2')); ?>
		</div>
		<?php
		
		if ( have_posts() ) :
			
			if ( is_home() && ! is_front_page() ) :
				?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
				<?php
			endif;
			
			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_type() );

			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		// $categories_list = get_the_category_list( esc_html__( ', ', 'demo-theme' ) );
		// echo $categories_list;
		?>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
