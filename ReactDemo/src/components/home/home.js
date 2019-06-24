import React, { Component } from 'react';
import RiskFactorComponent from '../riskfactor/riskFactors.js';
import './home.css';
import AuthService from '../services/AuthService';
import withAuth from '../services/withAuth';
import Autosuggest from 'react-autosuggest';
import AddRiskComponent from '../addrisk.js';
import RiskListComponent from '../risklist/riskList';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import fileSaver from 'file-saver';
import HeaderComponent from '../nav/nav'
// import fileSaver from 'file-saver'
// var fileSaver = require("file-saver")
/* const options = [
    { value: 'ageoOfCom', label: 'Age Of Company' },
    { value: 'ageoOfOwn', label: 'Age Of Owner' },
    { value: 'ageoOfPlant', label: 'Age Of Plant and Machinery' }
]; */
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: '',
            selectedRiskType: '',
            selectedOption: null,
            componentStatus: false,
            addfactor: false,
            listStatus: false,
            value: '',
            suggestions: [],
            searchFlag: true,
            viewListData: [],
            modal: false,
            loggedIn: true
        };
        this.toggle = this.toggle.bind(this);
        this.Auth = new AuthService();
        this.options = [];
        this.handleRiskTypeChange = this.handleRiskTypeChange.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
        this.token = localStorage.getItem('id_token');
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAuthorization = this.handleAuthorization.bind(this);
        this.navigationCallback = this.navigationCallback.bind(this);
        // this.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJzY29wZXMiOlsiUk9MRV9SVUJJWEFETUlOIl0sImlzcyI6IlJ1Yml4IiwiaWF0IjoxNTM2NTg0MTQ0LCJleHAiOjE1MzY1ODUwNDR9.qIIdXtm34edMChBTEc760PYSh9qF4QQXJvQXL3jZJSz6hwYKNS4eM_mWKezIhupLJQ7L5XXPceQFbTU-ETOxyQ"
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLogout() {
        this.Auth.logout();
        this.props.history.replace('/login');
    }
    handleRiskTypeChange(event) {
        this.setState({
            selectedOption: ''
        })
        console.log(this.riskTypeOptions);
        this.setState({
            selectedRiskType: event.target.value,
        });
        if (this.state.selectedRiskType) {
            this.setState({ searchFlag: false });
        } else {
            this.setState({ searchFlag: true });
        }
    }
    searchCallback = (temp) => {
        this.setState({
            selectedRiskType: temp
        })
    }
    handleRiskList = (value) => {
    }
    handleNextButton(event) {
        event.preventDefault();
        if (this.state.selectedOption) {
            this.setState({
                componentStatus: true
            });
        } else {
            console.log('Select Risk Factor');
        }
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    addRiskFactor(event) {
        event.preventDefault();
        this.setState({
            addFactor: true
        });
    }
    callBack = (temp) => {
        this.setState({
            componentStatus: temp,
            selectedOption: '',
            value: ''
        });
    }
    navigationCallback = (temp) => {
        this.setState({
            loggedIn: temp
        }, () => {
            this.props.history.replace('/login');
        })

    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length > 3) {
            if (this.token) {
                this.Auth.getSearchResult(value, this.state.selectedRiskType).then(result => {
                    if (result.status === 200) {
                        this.setState({
                            suggestions: getSuggestions(value, result.data)
                        });
                    }

                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            this.handleAuthorization();
                        } else {
                            console.log(error);
                        }
                    }
                });
            }
        }
    };
    handleAuthorization = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    getSuggestionValue(suggestion) {
        this.setState({
            selectedOption: suggestion

        }, () => { console.log(this.state.selectedOption) })
        return suggestion.value
    };
    /* componentDidMount() {
        console.log(this.state.selectedOption);
      } */
    viewList(event) {
        console.log(event);
        this.Auth.getViewList(this.state.selectedRiskType)
            .then(result => {
                this.setState({
                    viewListData: result.data
                }, () => {
                    console.log(this.state.viewListData)
                });
            }).catch(error => {
                if (error.response.status === 401) {
                    this.handleAuthorization();
                }

            });
    }
    downloadExcel(event) {
        const selectedId = undefined;
        event.preventDefault();
        this.Auth.downloadExcel(selectedId).then((response) => {
            var blob = new Blob([response.data], { type: 'application/octet-stream' });
            fileSaver.saveAs(blob, '_template.xlsx');
        }).catch(error => {
            if (error.response.status === 401) {
                this.handleAuthorization();
            }
        });
    }
    uploadExcel(event) {
        const selectedId = undefined;
        this.Auth.uploadExcel(event.target.files[0], selectedId).then((response) => {
            console.log(response);
        }).catch(error => {
            if (error.response.status === 401) {
                this.handleAuthorization();
            }
        });
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        const { value, suggestions } = this.state;
        let inputProps;
        if (this.state.selectedRiskType) {
            inputProps = {
                placeholder: "Search Risk Factor's",
                value,
                onChange: this.onChange,
                disabled: false
            }
        } else {
            inputProps = {
                placeholder: "Search Risk Factor's",
                value,
                onChange: this.onChange,
                disabled: true
            };
        }
        /* let list = this.riskList.map(p => {
            return (
                <tr className="grey2" key={p.riskName} >
                    {Object.keys(p).filter(k => k !== 'id').map(k => {
                        return (
                            <td className="grey1" key={p.riskName + '' + k}>
                                <div name={p[k]} value={p[k]} onClick={() => this.handleRiskList(p[k])}>
                                    {p[k]}
                                </div>
                            </td>);
                    })}
                </tr>
            );
        }); */
        if (this.state.componentStatus) {
            console.log(this.state.selectedOption);
            return <RiskFactorComponent riskFactor={this.state.selectedOption} riskFactorCallback={this.callBack} />;
        } else if (this.state.addFactor) {
            return <AddRiskComponent />
        } else if (this.state.listStatus) {
            return <RiskListComponent />
        } else {
            return (
                <div className="container-fluid">
                    <HeaderComponent loggedIn={this.state.loggedIn} navigationCallback={this.navigationCallback} />
                    <div className="search">
                        <h3>Search Risk Type</h3>
                        <form>
                            <div className="form-group row title">
                                <label htmlFor="title" className="col-md-2 col-sm-2 col-form-label"><strong>Risk Type</strong></label>
                                <div className="col-md-10 col-lg-10 col-sm-10">
                                    <select className="form-control select-risk" id="risk-type" onChange={(event) => this.handleRiskTypeChange(event)}>
                                        <option value= "">Select</option>
                                        <option value="qualitative">Qualitative</option>
                                        <option value="quantitative">Quantitative</option>
                                        <option value="overriding">Overriding</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row title">
                                <label htmlFor="title" className="col-md -2 col-sm-2 col-form-label"><strong>Search</strong></label>
                                <div className="col-md-10 col-lg-10 col-sm-10 search-bar">
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={(event) => this.getSuggestionValue(event)}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                    />
                                </div>
                            </div>
                            <div className="form-group row btn-grp">
                                <div className="col-md-4 col-sm-4">
                                    <button className="btn btn-primary button-group btn-type1" onClick={this.handleNextButton}>View Details</button>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <input onChange={(e) => this.uploadExcel(e)} type="file" name="file" id="file" className="uploadfile" />
                                    <button className="btn btn-info button-group btn-type2">Add Risk Factors</button>
                                    <button disabled={!this.state.selectedRiskType} className="btn button-group btn-type1" onClick={(event) => this.downloadExcel(event)}>Download Template</button>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button className="btn btn-danger button-group btn-type1" onClick={(event) => this.viewList(event)}>View List</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <a color="danger" onClick={this.toggle}>{this.props.buttonLabel}</a>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Authorization Error 401</ModalHeader>
                        <ModalBody>
                            Authorization Error Click Next to Logout
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleLogout}>Logout</Button>{' '}
                            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}

const getSuggestions = (value, result) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : result.filter(result =>
        result.value.toLowerCase().slice(0, inputLength) === inputValue
    );
};
const renderSuggestion = suggestion => (
    <div>
        {suggestion.value}
    </div>
);
// export default HomeComponent;
export default withAuth(HomeComponent);