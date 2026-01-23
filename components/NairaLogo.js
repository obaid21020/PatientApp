import { StyleSheet, Text, View } from 'react-native';

export default function NairaLogo() {
  return (
    <View style={styles.wrapper}>
      {/* green rounded square */}
      <View style={styles.square}>
        {/* white rotated inner square */}
        <View style={styles.inner} />
      </View>

      {/* word-mark */}
      <Text style={styles.brand}>NairaClinic</Text>
    </View>
  );
}

const SIZE = 32;            // outer square
const INNER = SIZE * 0.5;   // inner square
const styles = StyleSheet.create({
  wrapper: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 25 },
  square:  {
    width: SIZE,
    height: SIZE,
    borderRadius: 8,                          // rounded-lg
    backgroundColor: '#0F766E',               // primary-600
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  inner:   {
    width: INNER,
    height: INNER,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,                          // rounded-sm
    transform: [{ rotate: '45deg' }],         // rotate-45
  },
  brand:   {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F766E',                         // primary-700
    letterSpacing: 0.5,
  },
});