import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {

    buildURL(...args) {
        return `${super.buildURL(...args)}`;
    }

}
