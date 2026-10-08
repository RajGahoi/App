import Navigation from '@libs/Navigation/Navigation';
import {showErrorAlert} from '@pages/Share/ShareRootPage';
import ROUTES from '@src/ROUTES';
import {Alert} from 'react-native';

jest.mock('@libs/Navigation/Navigation', () => ({
    navigate: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('ShareRootPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('showErrorAlert', () => {
        it('navigates to ROUTES.HOME immediately and when alert button is pressed', () => {
            const title = 'Attachment too large';
            const message = 'File size exceeds 24MB limit.';

            showErrorAlert(title, message);

            expect(Alert.alert).toHaveBeenCalledWith(
                title,
                message,
                expect.arrayContaining([
                    expect.objectContaining({
                        onPress: expect.any(Function) as unknown,
                    }),
                ]),
            );

            // Immediate fallback navigation targets ROUTES.HOME
            expect(Navigation.navigate).toHaveBeenCalledWith(ROUTES.HOME);

            // Trigger alert onPress callback and assert it targets ROUTES.HOME
            const alertButtons = (Alert.alert as jest.Mock).mock.calls[0][2];
            const confirmButton = alertButtons[0];
            confirmButton.onPress();

            expect(Navigation.navigate).toHaveBeenCalledWith(ROUTES.HOME);
        });
    });
});
