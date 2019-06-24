import React, { Component } from 'react';
import './riskFactor.css'
import AuthService from '../services/AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import fileSaver from 'file-saver';
class RiskFactorComponent extends Component {
    constructor() {
        super();
        this.state = {
            // riskFactorData: {}
            selectedId: '',
            editable: false,
            data: {
                dbColumnList: [],
                riskFactorScores: []
            },
            modal: false
        }
        this.cancelButton = this.cancelButton.bind(this);
        this.Auth = new AuthService();
        this.downloadExcel = this.downloadExcel.bind(this);
        this.uploadExcel = this.uploadExcel.bind(this);
        // this.riskData();
    }
    handleAuthorization = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        this.setState({
            selectedId: this.props.riskFactor.id
        }, () => {
            this.Auth.viewRiskDetails(this.state.selectedId).then(result => {
                console.log(result.data);
                this.setState({
                    data: result.data
                });
            }).catch(error => {
                if (error.response.status === 401) {
                    this.handleAuthorization();
                }
            });
        });
    }
    riskData() {
    }
    cancelButton() {
        console.log(this.props);
        // this.props.riskFactor[0].riskFactorCallback(false);
        this.props.riskFactorCallback(false);
    }
    riskFactorScores(tempData) {

    }
    downloadExcel(event) {
        event.preventDefault();
        const selectedId = this.state.selectedId;
        this.Auth.downloadExcel(selectedId).then((response) => {
            var blob = new Blob([response.data], { type: 'application/octet-stream' });
            fileSaver.saveAs(blob, '_template.xlsx');
        }).catch(error => {
            if (error.response.status === 401) {
                this.handleAuthorization();
            }
        });;
    }
    uploadExcel(event) {
        this.Auth.uploadExcel(event.target.files[0], this.state.selectedId);
        console.log(event.target.files[0]);
    }
    render() {
        let item = [];
        for (let i = 0; i < this.state.data.riskFactorScores.length; i++) {
            const tempItem = {
                key: this.state.data.riskFactorScores[i].minFactorValue + '-' + this.state.data.riskFactorScores[i].maxFactorValue,
                value: this.state.data.riskFactorScores[i].score
            }
            item.push(tempItem);
        }
        let list = item.map(p => {
            return (
                <tr className="grey2" key={p.key}>
                    {Object.keys(p).filter(k => k !== 'id').map(k => {
                        return (<td className="grey1" key={p.key + '' + k}><div suppressContentEditableWarning="true" contentEditable={this.state.editable}
                            value={k} >{p[k]}</div></td>);
                    })}
                </tr>
            );
        });
        return (
            <div className="container-fluid">
                <div className="risk-card">
                    <h3>Qualitative Risk Factors</h3>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-lg-6 risk-key">
                            <div className="row">
                                <span><strong>Name of the risk factor:</strong></span>
                            </div>
                            <br />
                            <div className="row">
                                <span><strong>Type</strong></span>
                            </div>
                            <br />
                            <div className="row">
                                <span><strong>Source</strong></span>
                            </div>
                            <br />
                            <div className="row">
                                <span><strong>Transformation Rule</strong></span>
                            </div>
                            <br />
                            <div className="row">
                                <span><strong>Scoring Scenarios</strong></span>
                            </div><br />
                            <div className="row" >
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Factor</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6 risk-data">
                            <div className="row">
                                <span>{this.state.data.riskFactorSchemaName}</span>
                            </div>
                            <br />
                            <div className="row">
                                <span>{this.state.data.riskFactorDataType}</span>
                            </div>
                            <br />
                            <div className="row" >
                                <span>{this.state.data.dbColumnList.join(', ')}</span>
                            </div>
                            <br />
                            <div className="row" >
                                <span>{this.state.data.transformationFormula}</span>
                            </div><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 risk-key">
                            <div className="row">
                                <span><strong>Not Applicable Score</strong></span>
                            </div><br />
                            <div className="row">
                                <span><strong>Not Available Score</strong></span>
                            </div><br />
                            <div className="row">
                                <span><strong>Capping Rule</strong></span>
                            </div>
                            <div className="row">
                                <span>Min Cap</span>
                            </div>
                            <div className="row">
                                <span>Max Cap</span>
                            </div><br />
                            <div className="row">
                                <span><strong>Category</strong></span>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 risk-data">
                            <div className="row" >
                                <span>{this.state.data.notApplicableScore}</span>
                            </div><br />
                            <div className="row" >
                                <span>{this.state.data.notAvailableScore}</span>
                            </div><br />
                            <div className="row"></div><br />
                            <div className="row">
                                <span>{this.state.data.minCapFactor}</span>
                            </div>
                            <div className="row">
                                <span>{this.state.data.maxCapFactor}</span>
                            </div> <br />
                            <div className="row">
                                <span>{this.state.data.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row button-group">
                        <div className="col-md-3 col-sm-3 col-lg-3">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <button className="btn btn-primary" onClick={this.downloadExcel}>Download Template</button>
                                </div>
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <input onChange={(e) => this.uploadExcel(e)} type="file" name="file" id="file" className="inputfile" />
                                    <button className="btn btn-primary edit-button">Edit Risk Factors</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-lg-3">
                            <button className="btn btn-info">Replicate</button>
                        </div>
                        <div className="col-md-3 col-sm-3 col-lg-3">
                            <button className="btn btn-danger">Delete</button>
                        </div>
                        <div className="col-md-3 col-sm-3 col-lg-3">
                            <button className="btn btn-dark" onClick={this.cancelButton}>Cancel</button>
                        </div>
                    </div>
                </div>
                {/* <a color="danger" onClick={this.toggle}> {this.props.buttonLabel} </a> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Authorization Error 401</ModalHeader>
                    <ModalBody>
                        Authorization Error Click Next to Logout
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleLogout}>Next</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}
export default RiskFactorComponent;