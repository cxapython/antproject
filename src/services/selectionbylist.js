import sha1 from 'js-sha1';

let slleft = 0;
let sltop = 0;
let elementIdx = el => {
  let cnt = 0;
  for (let pre = el; el; el = el.previousElementSibling) {
    if (pre.nodeType === 1 && pre.tagName === el.tagName && pre.className === el.className) {
      ++cnt;
    }
  }
  return cnt;
};

export default class SelectionByList {
  constructor(el, color = null, belong = null, name = '', value = '', urllist = '') {
    this._el = el;
    this.color = color || {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
    this._xpath = null;
    this._rect = null;
    this._selector = null;
    this.type = 'link';
    this.belong = belong;
    this.expand = false;
    this._name = name;
    this._value = value;
    this._urllist = urllist;
  }

  get xpath() {
    if (this._xpath) return this._xpath;
    let xpath = '';
    for (let el = this._el; el && el.nodeType === 1; el = el.parentNode) {
      let xname = el.tagName.toLowerCase();
      if (el.className === 'antd-iframe-content') {
        xpath = `/${xpath}`;
        break;
      }
      xpath = `/${xname}${xpath}`;
    }
    this._xpath = xpath;
    return xpath;
  }

  get hash() {
    return sha1(this.xpath);
  }

  get urllist() {
    if (this._urllist) return this._urllist;
    let el = this._el;
    this._urllist = this.get_url_value(el);
    return this._urllist;
  }

  get_url_value(el, el_url_list = []) {
    for (let Node = el; Node; Node = Node.parentNode) {
      if (Node.nodeType === 1 && Node.tagName === 'A') {
        el = Node;
        break;
      }
    }
    if (el.tagName !== "A") {
      let el_list = el.childNodes;
      for (let index of el_list) {
        if (index.nodeType === 1 && index.tagName === 'A') {
          el = index;
          break
        }
      }
    }
    if (el_url_list.indexOf(el.href) === -1) {
      // 去重
      if (el.innerText) {
        let xpath = this.get_xpath(el);
        let url = el.href.replace(document.URL.replace('#/visual/list', ''), '');
        el_url_list.push({url: url, value: el.innerText, xpath: xpath});
      }
    }

    return el_url_list;
  }

// get_url_value(el, el_url_list = []) {
//   let el_list = el.childNodes;
//   for (let index in el_list) {
//     let el_index = el_list[index];
//     if (el_index.nodeName === '#text') {
//       continue;
//     }
//     if (el_index.nodeType === 1 && el_index.tagName === 'A') {
//       if (el_url_list.indexOf(el_index.href) === -1) {
//         // 去重
//         if (el_index.innerText) {
//           let xpath = this.get_xpath(el_index);
//           let url = el_index.href.replace(document.URL.replace('#/visual/list', ''), '');
//           el_url_list.push({ url: url, value: el_index.innerText, xpath: xpath });
//         }
//       }
//     }
//     this.get_url_value(el_index, el_url_list);
//   }
//   return el_url_list;
// }

  get_xpath(el_input) {
    let xpath = '';
    for (let el = el_input; el && el.nodeType === 1; el = el.parentNode) {
      let xname = el.tagName.toLowerCase();
      if (el.className === 'antd-iframe-content') {
        xpath = `/${xpath}`;
        break;
      }
      xpath = `/${xname}${xpath}`;
    }
    return xpath;
  }

  get value() {
    switch (this._el.tagName) {
      case 'INPUT':
        return this._el.value;
      case 'A':
        return this._el.href;
      case 'IMG':
        return this._el.src;
      default:
        return this._el.innerText
          .replace(/\ +/g, '')
          .replace(/[\r\n]/g, '')
          .substr(0, 60);
    }
  }

  updateVaule(left, top) {
    slleft = left;
    sltop = top;
  }

  updateRect(left, top) {
    let rect = {
      left: -left,
      top: -top,
      real_left: left,
      real_top: top,
      width: this._el.getBoundingClientRect().width,
      height: this._el.getBoundingClientRect().height,
    };
    for (let el = this._el; el; el = el.offsetParent) {
      rect.left += el.offsetLeft;
      rect.top += el.offsetTop;
      // deal with transform
      const transform = getComputedStyle(el).transform;
      if (transform !== 'none') {
        let rst = /^matrix\((-?\d+,\W?){4}(-?\d+),\W?(-?\d+)\)$/.exec(transform);
        if (rst && rst.length === 4) {
          rect.left += parseInt(rst[2]);
          rect.top += parseInt(rst[3]);
        }
      }
    }
    this._rect = rect;
  }

  get rect() {
    if (!this._rect) {
      this.updateRect(slleft, sltop);
    }
    return this._rect;
  }

  set color(color) {
    if (typeof color === 'string' && color.match(/^#[0-9A-Fa-f]{6}$/)) {
      // hex
      let r = parseInt(color.substr(1, 2), 16);
      let g = parseInt(color.substr(3, 2), 16);
      let b = parseInt(color.substr(5, 2), 16);
      color = {r, g, b};
    }
    this._color = color;
  }

  get color() {
    return this._color;
  }

  set el(el) {
    this._el = el;
    this.updateRect(slleft, sltop);
  }
}
