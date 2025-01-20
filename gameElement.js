class GameElement extends HTMLElement {
  constructor() {
    super()
    let css, html
    if(this.css) css = this.css()
    if(this.html) html = this.html()
    if(html || css){
      this.attachShadow({'mode':'open'})
      this.shadowRoot.innerHTML = `
        ${css ? `<style>${css}</style>` : ''}
        ${html ? html : '<slot></slot>'}
      `
    }

    this.shadowRoot?.querySelectorAll('*').forEach(el=> {
      Array.from(el.attributes).forEach(attr => {
        const prefix = attr.name.charAt(0)
        if(prefix == '@'){
          this[attr.value] = this[attr.value].bind(this)
          el.addEventListener(attr.name.slice(1), this[attr.value])
          el.removeAttribute(attr.name)
        }
        if(prefix == '?'){
          el.toggleAttribute(attr.name.slice(1), attr.value != 'false')
          el.removeAttribute(attr.name)
        }
      })
    })
  }

  select(s){
    return this.shadowRoot.querySelector(s)
  }

  selectAll(s){
    return this.shadowRoot.querySelectorAll(s)
  }

  fire(event, detail, attr){
    if(!attr) attr = 'on' + event
    let tempAttr = this.getAttribute(attr)
    if(tempAttr) eval(tempAttr)
    this.removeAttribute(attr)
    let e = new CustomEvent(event, {detail: detail, bubbles: true})
    this.dispatchEvent(e)
    setTimeout(()=>{
      if(tempAttr) this.setAttribute(attr, tempAttr)
    },1)
  }

  log(message, type){
    let color = ['deebff', '0747ac']
    if(type == 'warning') color = ['fffae5', 'ee6900']
    if(type == 'error') color = ['ffbdad', 'bf2600']
    let name = this.tagName.toLowerCase()
    let groupLabel = `%cgame%c${name}%c${message}`
    let style = ['padding:4px 8px;border-radius: 3px 0 0 3px;background:#0052cc;color:#fff','padding: 4px 8px;background:#4c9aff;color:#172b4d;', `padding: 4px 8px;border-radius:0 3px 3px 0;background:#${color[0]};color:#${color[1]};border-left:1px solid #${color[1]}`]
    console.group(groupLabel, style[0], style[1], style[2])
    console.info(this)
    console.groupEnd(groupLabel)
  }

}