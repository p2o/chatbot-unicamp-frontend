import React from "react";
import logo from "../assets/load.gif"

class PostQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            asked: false,
            episode: ''
        };

        this.postQuestion = this.postQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    postQuestion(question) {
        var value = { 'question': question };
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };
        this.setState({asked: true, episode: ''});
        fetch('http://unicamp.p20.com.br:8000/qa/bot', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({episode: data, asked: false}))
    }

    handleChange(event) {
        this.setState({question: event.target.value});
    }

    render() {
        return (
            <div>
                <div>
                    <textarea value={this.state.question} onChange={this.handleChange} cols="70" rows="2" />
                </div>
                <div>
                    <button onClick={() => this.postQuestion(this.state.question)}>Perguntar!</button>
                </div>
                <div>
                    { this.state.episode != "" ? (
                        <div>
                            <p>Resposta:</p>
                            <p>{ this.state.episode.answer }</p>
                        </div>
                    ) : (
                        <div>
                            { this.state.asked == true ? (
                                <img src={logo} alt="loading..." />
                            ) : (
                                <p>Digite uma pergunta e pressione o botão "Perguntar".</p>
                            )
                            }
                        </div>
                    )
                    
                    }
                </div>
            </div>
        )
    }

}

export { PostQuestion };

