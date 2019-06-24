import React, { Component } from 'react';
import './addRisk.css'
class AddRiskComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="add-card">
                    <h2>Qualitative Risk Factors</h2>
                    <form>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="riskName" className="col-form-label"><strong>Name Of The Risk Factor</strong></label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="riskName" placeholder="Name Of Risk Factor" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label className="col-form-label" htmlFor="risk-type"><strong>Type</strong></label>
                            </div>
                            <div className="col-md-8">
                                <select className="form-control" id="risk-type">
                                    <option>Numeric</option>
                                    <option>Alpha-Numeric</option>
                                    <option>Boolean</option>
                                    <option>List</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="source" className="col-form-label"><strong>Source</strong></label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="source" placeholder="Source" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="transformation-rule" className="col-form-label"><strong>Transformation Rule</strong></label>
                            </div>
                            <div className="col-md-8">
                                <textarea type="textarea" className="form-control" id="transformation-rule" placeholder="Transformation Rule" ></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="scoring-scenarios" className="col-form-label"><strong>Scoring Scenarios</strong></label>
                            </div>
                            <div className="col-md-8">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Factors</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" placeholder="Min" /></td>
                                            <td><input type="text" placeholder="Max" /></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" placeholder="Min" /></td>
                                            <td><input type="text" placeholder="Max" /></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" placeholder="Min" /></td>
                                            <td><input type="text" placeholder="Max" /></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" placeholder="Min" /></td>
                                            <td><input type="text" placeholder="Max" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="notApplicable" className="col-form-label"><strong>Not Applicable Score</strong></label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="notApplicable" placeholder="Not Applicable Score" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="notAvailable" className="col-form-label"><strong>Not Available Score</strong></label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="notAvailable" placeholder="Not Available Score" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="cappingRule" className="col-form-label"><strong>Capping Rule</strong></label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="minCap" className="col-form-label">Min Cap</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="minCap" placeholder="Minimum Cap" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="maxCap" className="col-form-label">Max Cap</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="minCap" placeholder="Maximum Cap" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <label htmlFor="category" className="col-form-label"><strong>Category</strong></label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="category" placeholder="Category" />
                            </div>
                        </div>
                        <div className="row button-group">
                        <div className="col-md-3">
                            <button className="btn btn-primary">Save</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-info">Reset</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddRiskComponent;