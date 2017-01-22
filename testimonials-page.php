<?php
/*
 Template Name: Testimonials
 *
 * This is your custom page template. You can create as many of these as you need.
 * Simply name is "page-whatever.php" and in add the "Template Name" title at the
 * top, the same way it is here.
 *
 * When you create your page, you can just select the template and viola, you have
 * a custom page template to call your very own. Your mother would be so proud.
 *
 * For more info: http://codex.wordpress.org/Page_Templates
*/
?>

<?php get_header(); ?>

            <div id="content">

                <div id="inner-content" class="wrap cf">

                    <div id="main" class="m-all t-3of3 d-7of7 cf" role="main">

                        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                        <article id="post-<?php the_ID(); ?>" <?php post_class( 'cf' ); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">

                                <section class="entry-content cf" itemprop="articleBody" id="testimonials-content">

                                    <?php
                                        $pages = get_pages(array('child_of' => 25));

                                        foreach($pages as $page) {
                                            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $page->ID ))[0];
                                    ?>

                                    <div class="testimonial cf">
                                        <h3><?php _e($page->post_title) ?></h3>
                                        <p><?php _e($page->post_content) ?></p>

                                        <?php
                                            if ($image) {
                                        ?>
                                                <div class="m-all t-2of3 d-2of3">
                                                    <div class="m-all t-1of3 d-1of3 testimonial__img">
                                                        <img src="<?php _e($image) ?>" title="<?php _e($page->post_title) ?>" alt="<?php _e($page->post_title) ?>">
                                                    </div>
                                                </div>
                                        <?php
                                            } else {
                                        ?>
                                                <div class="m-all t-3of3 d-3of3"></div>
                                        <?php
                                    }
                                        ?>
                                    </div>

                                    <?php
                                        }
                                    ?>

                                </section>

                                <footer class="article-footer">

                                </footer>

                                <?php comments_template(); ?>

                        </article>

                        <?php endwhile; else : ?>

                                <article id="post-not-found" class="hentry cf">
                                        <header class="article-header">
                                            <h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
                                    </header>
                                        <section class="entry-content">
                                            <p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
                                    </section>
                                    <footer class="article-footer">
                                            <p><?php _e( 'This is the error message in the page-custom.php template.', 'bonestheme' ); ?></p>
                                    </footer>
                                </article>

                        <?php endif; ?>

                    </div>

                </div>

            </div>


<?php get_footer(); ?>
