import React, { Component } from 'react';
import {connect} from 'react-redux';
import './MedicalFacility.scss';
import {FormattedMessage} from 'react-intl';
import Slider from 'react-slick';

class HandBook extends Component {
    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm Nang</span>
                        <button className="btn-section">Xem them</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-handbook"/>
                                <div>Hand Book 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook"/>
                                <div>Hand Book 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook"/>
                                <div>Hand Book 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook"/>
                                <div>Hand Book 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook"/>
                                <div>Hand Book 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook"/>
                                <div>Hand Book 6</div>
                            </div>
                        </Slider>
                    </div>
                    
                </div> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLogged,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook)