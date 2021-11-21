import React from 'react';

import { 
    Button
} from 'antd';

import { 
  CloudSyncOutlined,
    PlusCircleOutlined,
    ZoomInOutlined
} from '@ant-design/icons';

export default class TableTopBar extends React.Component {

  constructor(props) {
    super(props);

    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
    this.reloadButtonClicked = this.reloadButtonClicked.bind(this);
  }

  addButtonClicked(e) {
    this.props.addButtonClicked();
  }

  searchButtonClicked(e) {
    this.props.searchButtonClicked();
  }

  reloadButtonClicked(e) {
    this.props.reloadButtonClicked();
  }

  render() {
    return(
      <div style={{width:"100%", marginLeft:5}}>
        <Button icon={<PlusCircleOutlined/>} type="link" size="small" onClick={this.addButtonClicked}>
              Add new
        </Button>
        <Button icon={<ZoomInOutlined/>} type="link" size="small" onClick={this.searchButtonClicked}>
              Search data
        </Button>
        <Button icon={<CloudSyncOutlined/>} type="link" size="small" onClick={this.reloadButtonClicked}>
              Reload data
        </Button>
      </div>
    );
  }
}