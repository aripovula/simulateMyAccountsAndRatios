import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PostingForm from './PostingForm';
import { startEditPosting, startRemovePosting, startUnPostPosting, startRePostPosting } from '../actions/postings';

let actButtons;

class EditPosting extends React.Component {
    constructor(props) {
        console.log('in EditPosting');
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="card-4">
                    <div className="bggreen">

                        <h4><strong>Entry Form</strong> - edit mode</h4>
                    </div>
                    <PostingForm
                        posting={this.props.posting}
                        onSubmit={(posting) => {
                            this.props.dispatch(startEditPosting(this.props.posting.id, posting));
                            this.props.history.push('/postings');
                        }}
                    />
                    <span className="verIndent"></span>
                    <span className="horIndent"></span>
                    <button
                        className="button1"
                        onClick={() => {
                            this.props.dispatch(startRemovePosting({ id: this.props.posting.id }));
                            this.props.history.push('/postings');
                        }}>Permanently delete</button>

                    <span className="horIndent"></span>

                    <button
                        className="button1"
                        onClick={() => {
                            this.props.dispatch(removePosting({ id: this.props.posting.id }));
                            this.props.history.push('/postings');
                        }}>Temporarily un-post</button>

                    <span className="verIndent"></span>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, props) => {
    console.log('Edit state');
    console.log(state);
    return {
        posting: state.postings.find((posting) => posting.id === props.idtoedit)
    };
};

export default withRouter(connect(mapStateToProps)(EditPosting));