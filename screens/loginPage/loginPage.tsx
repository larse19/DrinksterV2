import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import WideButton from '../../common/components/wideButton';
import { colors, common } from '../../common/styles/styles';
import { handleAuth } from '../../utils/auth';

const signIn = async () => {
    await handleAuth();
}

function LoginPage(props: any) {
    return (
        <View style={[common.background, styles.container]}>
            <WideButton title="login" color={colors.primary} onPress={signIn}></WideButton>
        </View>
    );
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})