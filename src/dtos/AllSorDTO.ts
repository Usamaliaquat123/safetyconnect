import {report} from '@typings';

interface AllSorDTO {
  allProjects?: Array<any>;
  allOrganizations?: Array<any>;
  allSors?: Array<report>;
  loading: Boolean;
  error: Boolean;
}

export default AllSorDTO;
