import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Link from "../../UIComponents/Link";

class Logo extends PureComponent {
    render() {
        const {
            title, link, width, height,
        } = this.props;
        return (
            <Link href={link} title={title} alt={title} className="logo" link={link}>
                <img src="/resources/images/logo.png" alt={title} width={width} height={height} />
            </Link>
        );
    }
}

Logo.propTypes = {
    title: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    link: PropTypes.string,
};
Logo.defaultProps = {
    title: "Logo",
    link: "/",
};
Logo.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Logo;