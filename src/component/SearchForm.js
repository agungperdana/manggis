import React from "react";
import { Input, Modal } from "antd";

export default class SearchForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {key:''};

        this.doSearch = this.doSearch.bind(this);
        this.setKey = this.setKey.bind(this);
        this.doClose = this.doClose.bind(this);
    }

    doSearch() {

        this.props.doSearch(this.state.key);
    }

    setKey(e) {
        this.setState({key:e.target.value});
    }

    doClose() {
        this.props.closeSearchDialog();
    }

    render() {
        return(
            <Modal  title="Search data" 
                    width={250}        
                    visible={this.props.searchVisible} 
                    onCancel={this.doClose} 
                    onOk={this.doSearch} 
                    okText="Search">
                <Input.Search onChange={this.setKey} style={{width:"100"}}/>
            </Modal>
        );
    }
}