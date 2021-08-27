import {
  getAllOrganizations,
  createOrganization,
  getOrganization,
} from './organizationActions';
import {
  getAllSors,
  getRepeatedSors,
  filterSors,
  involvedPersons,
  updateSor,
  createSor,
  clearAllSor,
} from './listSorActions';
import {createProject, getAllProjects} from './projectActions';

export default {
  getAllSors,
  getRepeatedSors,
  filterSors,
  involvedPersons,
  updateSor,
  createSor,
  clearAllSor,
  createProject,
  getAllProjects,
  getAllOrganizations,
  createOrganization,
  getOrganization,
};
