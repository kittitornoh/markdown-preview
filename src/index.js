import marked from "marked";
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainText: props.example
    };
  }

  updateText(newText) {
    this.setState({ mainText: newText });
  }

  render() {
    return (
      <div className='row'>
        <TextEdit
          text={this.state.mainText}
          update={this.updateText.bind(this)}
        />
        <TextPreview text={this.state.mainText} />
      </div>
    );
  }
}
class TextEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textEdit: this.props.text
    };
  }

  updateHeight() {
    var target = document.getElementById("textEdit");
    target.style.height = "720px";
    target.style.height = target.scrollHeight + "px";
  }

  componentDidMount() {
    this.updateHeight();
  }

  updateTextHandler(e) {
    const newText = e.target.value;
    this.setState({ textEdit: newText });
    this.props.update(newText);
    this.updateHeight();
  }

  render() {
    return (
      <div className='col'>
        <form>
          <textarea
            id='textEdit'
            className='form-control'
            style={{
              resize: "none",
              outline: "none",
              padding: 20,
              overflow: "hidden"
            }}
            value={this.state.textEdit}
            onChange={this.updateTextHandler.bind(this)}
          ></textarea>
        </form>
      </div>
    );
  }
}

class TextPreview extends React.Component {
  updateText(t) {
    document.getElementById("markedText").innerHTML = t;
  }

  componentDidMount() {
    this.updateText(marked(this.props.text));
  }

  componentDidUpdate() {
    this.updateText(marked(this.props.text));
  }

  render() {
    return (
      <div className='col'>
        <div className='card'>
          <div
            id='markedText'
            className='card-body'
            style={{ minHeight: 720 }}
          ></div>
        </div>
      </div>
    );
  }
}

const EXAMPLE = [
  "# hello, This is Markdown Live Preview",
  "",
  "----",
  "## what is Markdown?",
  "see [Wikipedia](https://en.wikipedia.org/wiki/Markdown)",
  "",
  '> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people "to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)".',
  "",
  "----",
  "## usage",
  "1. Write markdown text in this textarea.",
  "2. Click 'HTML Preview' button.",
  "",
  "----",
  "## markdown quick reference",
  "# headers",
  "",
  "*emphasis*",
  "",
  "**strong**",
  "",
  "* list",
  "",
  ">block quote",
  "",
  "    code (4 spaces indent)",
  "[links](https://wikipedia.org)",
  "",
  "----",
  "## changelog",
  "* 17-Feb-2013 re-design",
  "",
  "----",
  "## thanks",
  "* [markdown-js](https://github.com/evilstreak/markdown-js)",
  ""
].join("\n");

ReactDOM.render(<App example={EXAMPLE} />, document.getElementById("content"));
