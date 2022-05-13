import * as React from 'react'

class ContentEditable extends React.Component {
  render() {
    const { innerRef } = this.props
    return (
      <div
        key={Math.random()}
        ref={innerRef}
        onInput={this.emitChange}
        onBlur={this.handleBlur}
        onKeyDown={this.emitKeyDown}
        contentEditable
        spellCheck="false"
        dangerouslySetInnerHTML={{ __html: this.props.value }}
      ></div>
    )
  }

  shouldComponentUpdate(nextProps) {
    const { current: div } = this.props.innerRef
    return nextProps.value !== div.innerText
  }

  emitChange = () => {
    const { current: div } = this.props.innerRef
    var value = div.innerText
    if (this.props.onChange && value !== this.lastValue) {
      this.props.onChange({
        target: {
          value
        }
      })
    }
    this.lastValue = value
  }

  emitKeyDown = e => {
    const { onKeyDown } = this.props
    onKeyDown && onKeyDown(e)
  }

  handleBlur = e => {
    this.emitKeyDown(e)
    const { onBlur } = this.props
    onBlur && onBlur(e)
  }
}

export default React.forwardRef((props, ref) => {
  return <ContentEditable innerRef={ref} {...props} />
})
