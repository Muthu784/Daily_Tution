import { Helmet } from 'react-helmet';
const PageBreadcrumb = ({
  title
}) => {
  return <>
			<Helmet>
				<title>{title} | Daily Tuition Inc.</title>
			</Helmet>
		</>;
};
export default PageBreadcrumb;