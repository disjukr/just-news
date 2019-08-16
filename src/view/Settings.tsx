import { h, Component } from 'preact';
import { css, styled } from 'linaria';

const settings = css`
  position: fixed;
  right: 0;
  top: 0;
  margin: 8px;
  padding: 8px;
  background: #f1f1f1;
  color: #666;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
`;

const row = css`
  display: flex;
  flex-direction: row;

  & + & {
    margin-top: 1px;
  }
`;

const button = css`
  color: #222;
  width: 100px;
  height: 48px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #efefef;
  }

  & + & {
    margin-left: 1px;
  }
`;

const lineHeight = css`
  display: flex;
  flex-direction: column;
`;

const popup = css`
  position: fixed;
  right: 48px;
  top: 8px;
  display: flex;
  flex-direction: column;
  background: #ddd;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0.5px 3px 1px rgba(0,0,0,.1);
`;


class Settings extends Component {
    clickListener?: (e: Event) => void;

    constructor() {
        super();
        this.state = {
            visible: false,
            fontFamily: 'serif', 
            fontSize: 11, 
            contentWidth: 640,
            lineHeight: 1.6,
        };

        Object.keys(this.state).forEach(key => {
            this.loadPref(key, this.state[key]);
        });
    }

    componentDidMount() {
        this.clickListener = (e) => {
            this.setState({ visible: false });
        };
        window.addEventListener('click', this.clickListener);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.clickListener!);
    }

    togglePopup() {
        this.setState({visible: !this.state.visible});
    }

    apply(key) {
        let node = document.getElementById('content');
        switch(key) {
            case 'fontFamily':
                node = document.body;
                if (this.state.fontFamily == 'sans-serif') {
                    node.style.fontFamily = "'Nanum Gothic', serif";
                } else {
                    node.style.fontFamily = "'Nanum Myeongjo', serif";
                }
                break;
            case 'fontSize':
                node.style.fontSize = this.state.fontSize + 'pt';
                break;
            case 'contentWidth':
                node.style.width = this.state.contentWidth + 'px';
                break;
            case 'lineHeight':
                node.style.lineHeight = this.state.lineHeight;
                break;
        }
    }

    set(key, value) {
        switch(key) {
            case 'fontFamily':
                this.state.fontFamily = value;
                break;
            case 'fontSize':
                this.state.fontSize = parseInt(this.state.fontSize) + parseInt(value);
                break;
            case 'contentWidth':
                this.state.contentWidth = parseInt(this.state.contentWidth) + parseInt(value);
                break;
            case 'lineHeight':
                this.state.lineHeight = Math.round((parseFloat(this.state.lineHeight) + parseFloat(value)) * 10) / 10;
                break;
        }
        this.apply(key);
        this.savePref(key, this.state[key]);
    }

    loadPref(key, value) {
        return GM.getValue(key, value).then((v) => {
            if (v != null && !isNaN(v)) {
                this.state[key] = v;
                this.apply(key);
            }
        });
    }

    savePref(key, value) {
        GM.setValue(key, value);
    }

    render(props, state) {
        return <div onClick={ e => e.stopPropagation() }>
            <div class={settings} onClick={ e => this.togglePopup() }>Aa</div>
            {
                this.state.visible ?
                <div id="popup" class={popup}>
                    <div class={row}>
                        <div class={button} style={{ fontFamily: `sans-serif` }}
                             onClick={ e => this.set('fontFamily', 'sans-serif') }>
                            고딕</div>
                        <div class={button} style={{ fontFamily: `serif` }}
                             onClick={ e => this.set('fontFamily', 'serif') }>
                            명조</div>
                    </div>
                    <div class={row}>
                        <div class={button} onClick={ e => this.set('fontSize', 1) }>&#43;</div>
                        <div class={button} onClick={ e => this.set('fontSize', -1) }>&#8722;</div>
                    </div>
                    <div class={row}>
                        <div class={button} onClick={ e => this.set('contentWidth', 40) }>← →</div>
                        <div class={button} onClick={ e => this.set('contentWidth', -40) }>→←</div>
                    </div>
                    <div class={row}>
                        <div class={button} onClick={ e => this.set('lineHeight', 0.1) }>
                          <div class={lineHeight} style={{ lineHeight: 0.38 }}>
                            <span>—</span><span>—</span><span>—</span>
                          </div>
                        </div>
                        <div class={button} onClick={ e => this.set('lineHeight', -0.1) }>
                          <div class={lineHeight} style={{ lineHeight: 0.25 }}>
                            <span>—</span><span>—</span><span>—</span>
                          </div>
                        </div>
                    </div>
                </div>
                : null
            }
            </div>;
    }
}

export default Settings;
