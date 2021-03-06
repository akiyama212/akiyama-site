import React, { Component } from 'react';
import { I18nextProvider, Translation } from 'react-i18next';
import { I18nProvider } from 'gatsby-i18n';
import setupI18next from '../../i18n';

const lngFormat = locale => locale.replace(/-[a-z]{2}$/, e => e.toUpperCase());

const withI18next = (options = {}) => Comp => {
  class I18nHOC extends Component {
    constructor(props) {
      super(props);

      const { pageContext, localeData } = props;
      this.state = {
        ...options,
        localeData: localeData ? localeData : pageContext.localeData
      };

      this.i18n = setupI18next(pageContext);
      this.activateLng();
    }

    activateLng = () => {
      const { pageContext } = this.props;
      const { localeData } = this.state;
      this.parseFromContext(localeData);
      this.i18n.changeLanguage(lngFormat(pageContext.locale));
    };

    parseFromContext = localeData => {
      const { pageContext } = this.props;
      if (localeData) {
        const lng = lngFormat(pageContext.locale);
        localeData.forEach(({ ns = 'common', content }) => {
          if (!this.i18n.hasResourceBundle(lng, ns)) {
            this.i18n.addResourceBundle(lng, ns, JSON.parse(content));
          }
        });
      }
    };

    componentDidUpdate(prevProps) {
      if (this.props.pageContext.locale !== prevProps.pageContext.locale) {
        this.activateLng();
      }
    }

    render() {
      const { ns } = this.state;
      return (
        <I18nextProvider i18n={this.i18n} defaultNS={ns}>
          <I18nProvider {...this.props.pageContext}>
            <Translation>
              {t => <Comp {...this.props} t={t} locale={this.props.pageContext.locale} />}
            </Translation>
          </I18nProvider>
        </I18nextProvider>
      );
    }
  }

  return I18nHOC;
};

export default withI18next;
