class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      author: '',
      comment: '',
      list: [],
    }

    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  inputHandler(event) {
    this.setState({
      [event.target.name] : event.target.value,
    });
  }

  submitHandler(event) {
    const { list } = this.state;
    this.setState({
      list: [...list, {
        author: this.state.author,
        comment: this.state.comment,
      }]
    });
    this.setState({
      author: '',
      comment: '',
    })
    event.preventDefault();
  }

  componentWillMount() {
    fetch('http://demo8940350.mockable.io/react')
    .then(response => response.json())
    .then(jsonData => {
      this.setState({data: jsonData});
    });
  }

  render() {
    const { data, author, comment, list } = this.state;
    const { inputHandler, submitHandler } = this;
    return (
      <div className="MainApp">
        <div class="ui menu">
          <div class="header item">
            React.js
          </div>
          <a class="item">
            Article
          </a>
          <a class="item">
            About
          </a>
        </div>
        <div className="homepage ui container">
          <div className="ui breadcrumb">
            <a className="section">AppName</a>
            <i className="right angle icon divider"></i>
            <a className="section">Article</a>
          </div>
          <h1 className="ui header center aligned">{data.title}</h1>
          <img className="image-content" src={data.image}/>
          <p className="description">
            {data.content}
          </p>
          <div class="ui relaxed list">
            {
              list.map((item, index) => (
              <div class="item" key={index}>
                <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/elliot.jpg" />
                <div class="content">
                  <a class="header">{item.author}</a>
                  <div class="desc">{item.comment}</div>
                </div>
              </div>
              ))
            }
          </div>
          <form class="ui form" onSubmit={submitHandler}>
            <div class="field">
              <div class="two fields">
                <div class="field">
                  <input 
                    type="text"
                    name="author"
                    value={author}
                    placeholder="Author"
                    onChange={inputHandler} 
                  />
                </div>
                <div class="field">
                  <input 
                    type="text"
                    name="comment"
                    value={comment}
                    placeholder="Comment here"
                    onChange={inputHandler}
                  />
                </div>
                <div class="field">
                  <button class="ui button" type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class About extends React.Component {
  render() {
    return(
      <div className="about">
        <h1 className="ui header center">Test</h1>
      </div>
    );
  }
}

ReactDOM.render(<MainMenu />, document.getElementById('root'));