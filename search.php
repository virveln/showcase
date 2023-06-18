<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package showcase
 */

get_header();
?>

<main id="primary" class="site-main site-search">

	<?php if ( have_posts() ) : ?>

		<header class="page-header">
			<h1 class="page-title">
				<?php
				/* translators: %s: search query. */
				printf( esc_html__( 'Search Results for: %s', 'showcase' ), '<span>' . get_search_query() . '</span>' );
				?>
			</h1>
		</header><!-- .page-header -->

		<?php
		global $wp_query;

		// Store the original query
		$original_query = $wp_query;
		
		// Check the referring page or any other parameter to determine which search form was submitted
		if ( strpos( $_SERVER['HTTP_REFERER'], '/courses' ) !== false ) {
			// Create a new query to filter on the "course" post type
			$args = array(
				'post_type'      => 'cours',
				's'              => get_search_query(),
				'posts_per_page' => 10, // Set the number of posts to display per page
			);
		} 
		elseif ( strpos( $_SERVER['HTTP_REFERER'], '/' ) !== false ) {
			// Create a new query to filter on the "project" post type
			$args = array(
				'post_type'      => 'project',
				's'              => get_search_query(),
				'posts_per_page' => 10, // Set the number of posts to display per page
			);
		} else {
			// Default query if no specific condition is met
			$args = array(
				's'              => get_search_query(),
				'posts_per_page' => 10, // Set the number of posts to display per page
			);
		}

		$wp_query = new WP_Query( $args );

		/* Start the Loop */
		while ( have_posts() ) :
			the_post();

			/**
			 * Run the loop for the search to output the results.
			 * If you want to overload this in a child theme then include a file
			 * called content-search.php and that will be used instead.
			 */
			get_template_part( 'template-parts/content', 'search' );

		endwhile;

		// Restore the original query
		$wp_query = $original_query;

		the_posts_navigation();

	else :

		get_template_part( 'template-parts/content', 'none' );

	endif;
	?>

</main><!-- #main -->

<?php
get_sidebar();
get_footer();
