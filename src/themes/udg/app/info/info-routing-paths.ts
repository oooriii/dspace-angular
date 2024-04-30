import { getInfoModulePath } from '../../../../app/app-routing-paths';

export const END_USER_AGREEMENT_PATH = 'end-user-agreement';
export const PRIVACY_PATH = 'privacy';
export const FEEDBACK_PATH = 'feedback';
export const ABOUT_PATH = 'about';

export function getEndUserAgreementPath() {
    return getSubPath(END_USER_AGREEMENT_PATH);
}

export function getPrivacyPath() {
    return getSubPath(PRIVACY_PATH);
}

export function getFeedbackPath() {
    return getSubPath(FEEDBACK_PATH);
}

export function getAboutPath() {
    console.log('about!', getSubPath(ABOUT_PATH))
    return getSubPath(ABOUT_PATH);
}

function getSubPath(path: string) {
    return `${getInfoModulePath()}/${path}`;
}