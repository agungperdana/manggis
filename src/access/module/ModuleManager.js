import React, { Fragment } from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router";
import ModuleAddForm from "./ModuleAddForm";
import ModuleEditForm from "./ModuleEditForm";
import ModulePrint from "./ModulePrint";
import SearchForm from "./../../component/SearchForm";
import ModuleTable from "./ModuleTable";
import { SERVER_ADDRESS, SERVER_METHOD_GET } from '../../component/ServerConstant';

export default class ModuleManager extends React.Component {

    constructor(props) {
    
        super(props);
    
        this.state = {
          rowData:[],
          printData:null,
          printVisible:false,
          showSearch:false,
        }
    
        //reload/refresh table content
        this.doReload = this.doReload.bind(this);

        // for data filter functionality
        this.openSearchDialog = this.openSearchDialog.bind(this);
        this.closeSearchDialog = this.closeSearchDialog.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }
    
    componentDidMount() {
        this.doReload();    
    }
    
    doReload() {
        const owner = this;
    
        if(this.props.token) {
            fetch(SERVER_ADDRESS+'/modules/all-modules/0/1000', {
                method: SERVER_METHOD_GET,
                headers: {
                  Accept: 'application/json', 
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer '+this.props.token,
            }})
            .then(response => response.json())
            .then(json => {owner.setState({rowData: json.result})})
            .catch(e => {
              console.log(e);
            });
          }
    }
    
    // Data search action
    openSearchDialog() {
        this.setState({showSearch:true});
    }
    
    closeSearchDialog() {
        this.setState({showSearch:false});
    }
    
    doSearch(key) {
    
        const _this = this;

        if(key && this.props.token) {
            try {
                fetch(SERVER_ADDRESS+'/modules/filter/0/50/'+key, {
                    method: SERVER_METHOD_GET,
                    headers: {
                      Accept: 'application/json', 
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer '+this.props.token,
                    }
                })
                .then(response => response.json())
                .then(json => {

                    _this.closeSearchDialog();
                    _this.setState({rowData:json.result});
                });
            } 
            catch (e) {}
        }
        else {
            _this.doReload();
        }
    }

    render() {
        return(
            <Fragment>
                <Layout.Content className="content">
                    <Switch>
                        <Route exact path="/access/module/list">
                            <ModuleTable row_data={this.state.rowData} 
                                         openSearchDialog={this.openSearchDialog} 
                                         refresh={this.doReload}/>
                        </Route>
                        <Route exact path="/access/module/add">
                            <ModuleAddForm/>
                        </Route>
                        <Route exact path="/access/module/edit">
                            <ModuleEditForm token={this.props.token}/>
                        </Route>
                    </Switch>
                </Layout.Content>
                <ModulePrint printVisible={this.state.printVisible} 
                            doPrint={this.doPrint} 
                            data={this.state.printData}/>
                <SearchForm searchVisible={this.state.showSearch} 
                            doSearch={this.doSearch} 
                            closeSearchDialog={this.closeSearchDialog}/>
            </Fragment>
        );
    }
}