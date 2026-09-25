/** Responsive image. `image` comes from data/content.js. */
export default function Img({ image, sizes = '100vw', eager = false, className = '', ...rest }) {
  return (
    <img
      className={className}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      draggable="false"
      {...rest}
    />
  )
}
