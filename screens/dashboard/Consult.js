import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../themes/regTheme';

const { width } = Dimensions.get('window');

const HEALTH_CATEGORIES = [
  'Fever or malaria-like',
  'Cough / cold / sore throat',
  'Headache / migraine',
  'Body pain / back or joints',
  'Refill my medicine',
  'Stomach pain / diarrhea',
  'Skin or rashes',
  'Eye or ear problems',
  'Period pain / irregular cycle',
  'Vaginal discharge / UTI',
  'Family planning',
  'Pregnancy (I\'m pregnant)',
  'Child fever / cough',
  'Rashes / skin (child)',
  'Urinary / prostate symptoms',
  'Blood pressure (Hypertension)',
  'Diabetes (Type 2)',
  'Asthma',
  'Stress / anxiety',
  'Low mood / sadness',
  'Sleep problems',
  'Possible STI exposure',
  'Order a lab test',
  'Health screening',
];

export default function Consult() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your AI health assistant. How are you feeling today? Please describe your symptoms or select from the options below.",
      timestamp: '10:30 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);
  const scrollViewRef = useRef();
  const flatListRef = useRef();

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate AI response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: 'Thank you for that information. Based on your symptoms, I recommend...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 500);
    }
  };

  const handleSymptomSelect = (symptom) => {
    toggleSymptom(symptom);
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: symptom,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: `I see you selected "${symptom}". Tell me more about this issue, or select another symptom.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === 'user'
          ? styles.userMessageContainer
          : styles.botMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.type === 'user' ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.type === 'user'
              ? styles.userMessageText
              : styles.botMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.type === 'user' ? styles.userTime : styles.botTime,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Consult</Text>
        </View>

        <View style={{ width: 28 }} />
      </View>

      <View style={styles.headerSubtext}>
        <Text style={styles.subtext}>Get medical advice and schedule appointments</Text>
      </View>

      {/* AI Assistant Info */}
      <View style={styles.assistantCard}>
        <View style={styles.assistantIcon}>
          <Ionicons name="desktop-outline" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.assistantInfo}>
          <Text style={styles.assistantName}>AI Health Assistant</Text>
          <Text style={styles.assistantStatus}>Online • Responds instantly</Text>
        </View>
      </View>

      {/* Messages and Symptoms in ScrollView */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          style={styles.messagesList}
        />

        {/* Quick Symptoms Section */}
        <View style={styles.symptomsSection}>
          <Text style={styles.symptomsTitle}>Quick symptoms (Skip general care):</Text>
          <View style={styles.symptomsGrid}>
            {HEALTH_CATEGORIES.slice(0, 5).map((symptom, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.symptomPill,
                  selectedSymptoms.includes(symptom) &&
                    styles.symptomPillActive,
                ]}
                onPress={() => handleSymptomSelect(symptom)}
              >
                <Text
                  style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom) &&
                      styles.symptomTextActive,
                  ]}
                >
                  {symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.showAllButton}
            onPress={() => setShowAllSymptoms(!showAllSymptoms)}
          >
            <Text style={styles.showAllText}>
              {showAllSymptoms ? 'Hide symptoms ∨' : 'Show all symptoms ∧'}
            </Text>
          </TouchableOpacity>

          {/* Additional symptoms (collapsible) */}
          {showAllSymptoms && (
            <View style={styles.symptomsGrid}>
              {HEALTH_CATEGORIES.slice(5, 13).map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.symptomPill,
                    selectedSymptoms.includes(symptom) &&
                      styles.symptomPillActive,
                  ]}
                  onPress={() => handleSymptomSelect(symptom)}
                >
                  <Text
                    style={[
                      styles.symptomText,
                      selectedSymptoms.includes(symptom) &&
                        styles.symptomTextActive,
                    ]}
                  >
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Remaining symptoms (always visible if showAllSymptoms) */}
          {showAllSymptoms && (
            <View style={styles.symptomsGrid}>
              {HEALTH_CATEGORIES.slice(13).map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.symptomPill,
                    selectedSymptoms.includes(symptom) &&
                      styles.symptomPillActive,
                  ]}
                  onPress={() => handleSymptomSelect(symptom)}
                >
                  <Text
                    style={[
                      styles.symptomText,
                      selectedSymptoms.includes(symptom) &&
                        styles.symptomTextActive,
                    ]}
                  >
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="image-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxHeight={100}
          />

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="mic-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send-outline"
              size={24}
              color={inputText.trim() ? 'white' : '#CCC'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  headerSubtext: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subtext: {
    fontSize: 13,
    color: '#999',
    fontFamily: FONTS.Poppins,
  },
  assistantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 1,
  },
  assistantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assistantInfo: {
    flex: 1,
  },
  assistantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  assistantStatus: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS.Poppins,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesList: {
    marginVertical: 12,
  },
  messageContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
  },
  botBubble: {
    backgroundColor: '#E8E8E8',
  },
  messageText: {
    fontSize: 14,
    fontFamily: FONTS.Poppins,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#1A1A1A',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: FONTS.Poppins,
  },
  userTime: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  botTime: {
    color: '#999',
  },
  symptomsSection: {
    marginVertical: 12,
  },
  symptomsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 8,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  symptomPill: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  symptomPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  symptomText: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS.Poppins,
  },
  symptomTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  showAllButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  showAllText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    fontFamily: FONTS.Poppins,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 12,
    gap: 4,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: FONTS.Poppins,
    color: '#1A1A1A',
  },
  sendButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 18,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
  },
});
