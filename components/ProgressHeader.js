import { Text, View } from 'react-native';

export default function ProgressHeader({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <View style={{ backgroundColor: '#0F766E', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 7 }}>
      <Text style={{ color: '#fff', fontSize: 12 }}>Step {current} of {total}</Text>
      <View style={{ height: 4, backgroundColor: '#fff4', borderRadius: 2, marginTop: 4 }}>
        <View style={{ height: 4, width: `${percent}%`, backgroundColor: '#fff', borderRadius: 2 }} />
      </View>
    </View>
  );
}