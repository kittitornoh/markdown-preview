import marked from "marked";
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    // primary source of text
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

/*
 * The area of text the user can edit.
 */
class TextEdit extends React.Component {
  constructor(props) {
    super(props);

    // text source for editable area
    this.state = {
      textEdit: this.props.text
    };
  }

  /*
   * Set a minHeight value of 720px, as well as dynamically set the textarea height
   * to the scroll height.
   */
  updateHeight() {
    var target = document.getElementById("textEdit");
    target.style.height = "720px"; // minHeight
    target.style.height = target.scrollHeight + "px";
  }

  /*
   * Set the textarea height to the height of the example text.
   */
  componentDidMount() {
    this.updateHeight();
  }

  /*
   * Update this component's state, as well as update the parent state accordingly.
   * Afterwards, update the height of the textarea.
   * @param e   the event
   */
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

/*
 * The area of text that renders the markdown text from the user input.
 */
class TextPreview extends React.Component {
  /*
   * Update the HTML of the rendered preview.
   * @param t   HTML to update to
   */
  updateText(t) {
    document.getElementById("markedText").innerHTML = t;
  }

  /*
   * Initial update of the example HTML.
   */
  componentDidMount() {
    this.updateText(marked(this.props.text));
  }

  /*
   * Update the HTML dynamically as the user types.
   */
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

// example text to render initially
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
