import React from 'react';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

const DotdigitalFormShimmer = props => {
    /** Example Form loader */
    const shimmerContainerStyle = {
        textAlign: 'center',
        width: '50%',
        margin: '2em auto',
        display: props.display ? 'block' : 'none'
    };
    const shimmerElement = {};
    const shimmerStyle = { textAlign: 'left', margin: '1em 0' };
    const shimmerStyleActions = { textAlign: 'right', margin: '1em 0' };

    return (
        <div id="dd-form-loader-container" style={shimmerContainerStyle}>
            <div id="dd-form-loader" style={shimmerStyle}>
                <Shimmer
                    style={shimmerElement}
                    width={Math.floor(Math.random() * 50 + 10) + '%'}
                    height={'20px'}
                />
                <Shimmer
                    style={shimmerElement}
                    width={'100%'}
                    height={'40px'}
                />
            </div>
            <div id="dd-form-loader" style={shimmerStyle}>
                <Shimmer
                    style={shimmerElement}
                    width={Math.floor(Math.random() * 50 + 10) + '%'}
                    height={'20px'}
                />
                <Shimmer
                    style={shimmerElement}
                    width={'100%'}
                    height={'40px'}
                />
            </div>
            <div id="dd-form-loader" style={shimmerStyle}>
                <Shimmer
                    style={shimmerElement}
                    width={Math.floor(Math.random() * 50 + 10) + '%'}
                    height={'20px'}
                />
                <Shimmer
                    style={shimmerElement}
                    width={'100%'}
                    height={'40px'}
                />
            </div>
            <div id="dd-form-loader" style={shimmerStyleActions}>
                <Shimmer style={shimmerElement} width={'20%'} height={'40px'} />
            </div>
        </div>
    );
};

DotdigitalFormShimmer.defaultProps = {
    disaply: true
};

export default DotdigitalFormShimmer;
