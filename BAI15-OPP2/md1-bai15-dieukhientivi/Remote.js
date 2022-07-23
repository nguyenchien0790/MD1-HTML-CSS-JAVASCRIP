class Remote {
    onOff(tv){
        tv.setStatus(!tv.getStatus())
    }
    chanelReset(tv,chanel){
        if (tv.getStatus()){
            tv.setChanel(chanel)
        }else {
            console.log("Ban chua bat tivi");
        }
    }
    volumeReset(tv){
        if(tv.getStatus()){
            if (tv.getVolume()<3){
                tv.setVolume(tv.getVolume()+1)
            }else {

                return "To het co doi"
            }
        }
    }
}