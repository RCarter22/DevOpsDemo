
cp -r /appl/jenkins/workspace/EZMax-NonProd/META-INF /appl/jenkins/workspace/EZMax-NonProd/target
cd /appl/jenkins/workspace/EZMax-NonProd/target
jar -cvf ezmaxmobile.ear ezmaxmobile.war META-INF
