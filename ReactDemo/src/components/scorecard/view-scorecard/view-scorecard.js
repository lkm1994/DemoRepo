import React, { Component } from 'react';
import './view-scorecard.css';
import AuthService from '../../services/AuthService';
// import Autosuggest from 'react-autosuggest';
class ViewScorecardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            value: '',
            suggestions: [],
            modifyFlag: true
        };
        this.scoreDetails = [];
        this.Auth = new AuthService();
        this.token = localStorage.getItem('id_token');
    }
    componentDidMount() {
    }
    render() {
        this.scoreDetails = [
            {
                nameOfScorecard: this.props.selectedScorecard,
                applicableTo: 'Turnover < 200 crs  Line Of Business is Manufacturing',
                financialFactors: [
                    {
                        name: 'Current Ratio',
                        weight: 3
                    },
                    {
                        name: 'Quick Ratio',
                        weight: 5
                    },
                    {
                        name: 'Gross Profit Ratio',
                        weight: 4
                    },
                    {
                        name: 'Net Profit Ratio',
                        weight: 8
                    },
                    {
                        name: 'EBITDA/Sales%',
                        weight: 6
                    }
                ],
                nonfinancialFactors: [
                    {
                        name: 'Age Of Company',
                        weight: 4
                    },
                    {
                        name: 'Legal Constitution',
                        weight: 3
                    },
                    {
                        name: 'Experiance Of Promoters',
                        weight: 5
                    },
                    {
                        name: 'Brand',
                        weight: 4
                    },
                    {
                        name: 'Quality Certificate',
                        weight: 3
                    }
                ],
                overrides: ['Adverse News', 'Management Attrition', 'Industry Recession'],
                riskGrades: [
                    {
                        minRange: '',
                        maxRange: 150,
                        gradeName: 'Rx1',
                        gradeDescription: 'Risk Category 1',
                        Pd: ''
                    },
                    {
                        minRange: 151,
                        maxRange: 250,
                        gradeName: 'Rx2',
                        gradeDescription: 'Risk Category 2',
                        Pd: ''
                    }
                ]
            }
        ];
        let financialList = this.scoreDetails[0].financialFactors.map(p => {
            return (
                <tr className="grey2" key={p.name} >
                    {Object.keys(p).filter(k => k !== 'id').map(k => {
                        return (
                            <td className="grey1" key={p.name + '' + k}>
                                <div name={p[k]} value={p[k]}>
                                    {p[k]}
                                </div>
                            </td>);
                    })}
                </tr>
            );
        });
        let riskGrades = this.scoreDetails[0].riskGrades.map(p => {
            return (
                <tr className="grey2" key={p.gradeName} >
                    {Object.keys(p).filter(k => k !== 'id').map(k => {
                        return (
                            <td className="grey1" key={p.gradeName + '' + k}>
                                <div name={p[k]} value={p[k]}>
                                    {p[k]}
                                </div>
                            </td>);
                    })}
                </tr>
            );
        });

        let nonFinancialList = this.scoreDetails[0].nonfinancialFactors.map(p => {
            return (
                <tr className="grey2" key={p.name} >
                    {Object.keys(p).filter(k => k !== 'id').map(k => {
                        return (
                            <td className="grey1" key={p.name + '' + k}>
                                <div name={p[k]} value={p[k]}>
                                    {p[k]}
                                </div>
                            </td>);
                    })}
                </tr>
            );
        });
        let overriddenList = this.scoreDetails[0].overrides.map(p => {
            return (
                <div className="row" key={p}>
                    {p}
                </div>
            );
        });
        return (
            <div className="container-fluid">
                <div className="create-score">
                    <h3>Scorecard</h3>
                    <form>
                        <div className="row score">
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Name Of Scorecard</strong></span>
                                </div>
                                <div className="row">
                                    <span className="score-columns"><strong>Applicable To</strong></span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row form-group">
                                    <input className="form-control" type="text" disabled={this.state.modifyFlag} value={this.scoreDetails[0].nameOfScorecard.value} />
                                </div>
                                <div className="row form-group">
                                    <input className="form-control" type="text" disabled={this.state.modifyFlag} value={this.scoreDetails[0].applicableTo} />
                                </div>
                            </div>
                        </div>
                        <div className="row financial-factors">
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Financial Factors</strong></span>
                                </div>
                                <div className="financial-risk">
                                    <div className="row" >
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Factor</th>
                                                    <th>Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {financialList}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Risk Grades</strong></span>
                                </div>
                                <div className="risk-grade">
                                    <div className="row primary-columns">
                                        <div className="col-md-4 col-lg-4 col-sm-4 score-range">
                                            <strong>Score Range</strong>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-3 grade-name">
                                            <strong>Grade</strong>
                                        </div>
                                        <div className="col-md-5 col-lg-5 col-sm-5 grade-desc">
                                            <strong>Grade</strong>
                                        </div>
                                    </div>
                                    <table className="table table-bordered risk-table">
                                        <thead>
                                            <tr>
                                                <th>Min</th>
                                                <th>Max</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>PD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {riskGrades}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row financial-factors">
                            <div className="col-md-6 col-sm-6 col-lg-6">
                                <div className="row">
                                    <span className="score-columns"><strong>Non-Financial Factors</strong></span>
                                </div>
                                <div className="financial-risk">
                                    <div className="row" >
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Factor</th>
                                                    <th>Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {nonFinancialList}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row financial-factors">
                            <div className="col-md-12 col-lg-12 col-sm-12 override">
                                <span className="score-columns"><strong>Over-Ridding Factors</strong></span>
                            </div>
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                {overriddenList}
                            </div>
                        </div>
                        <div className="row financial-factors scorecard-buttons">
                            <div className="col-md-4 col-lg-4 col-sm-4">
                                <button className="btn btn-type1 score-button">Modify</button>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-4">
                                <button className="btn btn-type1 score-button">Delete</button>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-4">
                                <button className="btn btn-type2 score-button">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default ViewScorecardComponent;