import { NavBar } from '../../shared/nav-bar/nav-bar';
import { ProfileView } from '../../views/profile-view/profile-view';
import { AuthenticatedRoute } from '../authenticated-route/authenticated-route';

export function ProfileRoute() {
    return (
        <AuthenticatedRoute>
            <NavBar />
            <ProfileView />
        </AuthenticatedRoute>
    );
}
