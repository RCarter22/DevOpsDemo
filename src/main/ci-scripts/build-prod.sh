
cp -r /appl/jenkins/workspace/EZMax-Prod/META-INF /appl/jenkins/workspace/EZMax-Prod/target
cd /appl/jenkins/workspace/EZMax-Prod/target
jar -cvf ezmaxmobile.ear ezmaxmobile.war META-INF
