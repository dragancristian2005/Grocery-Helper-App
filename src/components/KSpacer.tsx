import {SafeAreaView} from "react-native";
import React from "react";

interface KSpacerProps {
    children: React.ReactNode
}

const KSpacer:React.FC<KSpacerProps> = ({children}) => {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#005BAA", alignItems:"center"}}>
            {children}
        </SafeAreaView>
    )
}

export default KSpacer;