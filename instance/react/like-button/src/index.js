const createDOMFromString = (domString) => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
};

class LikeButton {
    constructor() {
        this.state = {
            isLiked: false
        };
        this.changeLikeText = this.changeLikeText.bind(this);
    }


    changeLikeText() {
        const likeText = this.el.querySelector('.like-text');
        this.state.isLiked = !this.state.isLiked;
        likeText.innerHTML = this.state.isLiked ? '取消' : '点赞';
    }

    render() {
        this.el = createDOMFromString(`
         <button id="like-btn">
            <span class="like-text">点赞</span>
            <span>👍</span>
         </button>
       `);
        this.el.addEventListener('click', this.changeLikeText, false);
        return this.el;
    }
}

const wrapper = document.querySelector('.wrapper');
const likeButton = new LikeButton();
wrapper.appendChild(likeButton.render());