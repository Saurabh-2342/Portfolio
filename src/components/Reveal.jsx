import { useReveal } from '../hooks/useReveal'

// Wraps children in a scroll-reveal. `as` picks the element, extra props pass
// through (className, style, etc.). `delay` staggers grouped reveals.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal()
  const style = delay ? { transitionDelay: `${delay}ms`, ...rest.style } : rest.style
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      {...rest}
      style={style}
    >
      {children}
    </Tag>
  )
}
