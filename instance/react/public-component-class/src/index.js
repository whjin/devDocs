const createDOMFromString = (domString) => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
};

class Component {
    constructor(props = {}) {
        this.props = props;
        this.onClick = this.onClick.bind(this);
    }


    setState(state) {
        const oldEl = this.el;
        this.state = state;
        this.el = this.renderDOM();
        if (this.onStateChange) {
            this.onStateChange(oldEl, this.el)
        }
    }


    renderDOM() {
        this.el = createDOMFromString(this.render());
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick, false)
        }
        return this.el;
    }
}

const mount = (component, wrapper) => {
    wrapper.appendChild(component.renderDOM());
    component.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl);
        wrapper.removeChild(oldEl)
    }
};

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false
        };
    }

    onClick() {
        this.setState({
            isLiked: !this.state.isLiked
        });
    }

    render() {
        return `
        <button class="like-btn" style="background-color: ${this.props.bgColor};">
            <span class="like-text">
                ${this.state.isLiked ? '取消' : '点赞'}
            </span>
            <span>👍</span>
        </button>
        `
    }
}

class RedBlueButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red'
        }
    }

    onClick() {
        this.setState({
            color: 'blue'
        })
    }

    render() {
        return `
        <button style="color:${this.state.color}" class="colorText">${this.state.color}</button>
        `
    }
}

const wrapper = document.querySelector('.wrapper');
mount(new LikeButton({bgColor: 'red'}), wrapper);
mount(new LikeButton(), wrapper);
mount(new RedBlueButton(), wrapper);

