/**
 * Model Layer (MVC Architecture)
 * Centralizes all data schemas, MongoDB cloud client services, and static datasets.
 */

// Types & Schemas
export * from './types/index';

// Services (Data Access & Cloud Persistence Models)
export * from './services/enquiryService';
export * from './services/siteSettingsService';
export * from './services/employeeActivityService';
export * from './services/pdfService';

// Data Models
export * from './data/company';
export * from './data/projects';
export * from './data/services';
export * from './data/solutions';
export * from './data/faqs';
export * from './data/licencesData';
export * from './data/mediaData';
export * from './data/navigation';
export * from './data/resources';
