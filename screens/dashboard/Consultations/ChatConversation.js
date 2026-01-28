import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatInputBar from '../../../components/ChatInputBar';
import { COLORS, FONTS } from '../../../themes/regTheme';

export default function ChatConversation() {
  const navigation = useNavigation();
  const route = useRoute();
  const { conversationId, participant } = route.params;
  const flatListRef = useRef();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Initialize with static data based on conversationId
  useEffect(() => {
    const initialData = getConversationData(conversationId);
    setMessages(initialData);
  }, [conversationId]);

  const getConversationData = (id) => {
    const conversations = {
      1: [ // Dr. Sarah Johnson
        { id: 1, type: 'bot', text: "Good morning! I'm Dr. Sarah. How can I help you today?", timestamp: '9:30 AM' },
        { id: 2, type: 'user', text: "Hi Doctor, I've been having headaches for the past week.", timestamp: '9:32 AM' },
        { id: 3, type: 'bot', text: "I see. Can you describe the pain? Is it sharp, dull, or throbbing?", timestamp: '9:33 AM' },
        { id: 4, type: 'user', text: "It's a throbbing pain, mostly on the right side.", timestamp: '9:35 AM' },
        { id: 5, type: 'bot', text: "Any nausea or sensitivity to light with these headaches?", timestamp: '9:36 AM' },
      ],
      2: [ // Pharmacy
        { id: 1, type: 'bot', text: "Welcome to NairaClinic Pharmacy! How can we assist with your medication today?", timestamp: 'Yesterday' },
        { id: 2, type: 'user', text: "I need to refill my prescription for Metformin.", timestamp: 'Yesterday' },
        { id: 3, type: 'bot', text: "Sure! Can you provide your prescription number or patient ID?", timestamp: 'Yesterday' },
        { id: 4, type: 'user', text: "It's RX-2024-8842", timestamp: '2:15 PM' },
        { id: 5, type: 'bot', text: "Thank you! We have your prescription ready for pickup or delivery. Would you like same-day delivery?", timestamp: '2:16 PM' },
      ],
      3: [ // Lab Results
        { id: 1, type: 'bot', text: "Your lab results for the Full Blood Count are now available.", timestamp: '10:00 AM' },
        { id: 2, type: 'user', text: "Is everything normal?", timestamp: '10:05 AM' },
        { id: 3, type: 'bot', text: "Most parameters are within normal range. However, your cholesterol is slightly elevated at 220 mg/dL.", timestamp: '10:06 AM' },
        { id: 4, type: 'user', text: "Should I be worried?", timestamp: '10:08 AM' },
        { id: 5, type: 'bot', text: "It's mildly elevated. I recommend dietary changes and a follow-up in 3 months. Would you like to schedule a consultation?", timestamp: '10:10 AM' },
      ],
      4: [ // Dr. Michael Chen
        { id: 1, type: 'bot', text: "Hello! This is Dr. Chen from Cardiology. Following up on your BP monitoring.", timestamp: '4:00 PM' },
        { id: 2, type: 'user', text: "Hi Dr. Chen, my readings have been around 130/85 this week.", timestamp: '4:15 PM' },
        { id: 3, type: 'bot', text: "That's improved from last month! Are you taking the medication regularly?", timestamp: '4:16 PM' },
        { id: 4, type: 'user', text: "Yes, twice daily as prescribed.", timestamp: '4:18 PM' },
        { id: 5, type: 'bot', text: "Excellent. Keep monitoring and we'll review at your next appointment.", timestamp: '4:20 PM' },
      ],
    };
    return conversations[id] || [];
  };

  const handleSend = (text) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate reply after 1 second
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        type: 'bot',
        text: "Thank you for your message. A healthcare professional will review this shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.type === 'user' ? styles.userMessageContainer : styles.botMessageContainer,
    ]}>
      <View style={[
        styles.messageBubble,
        item.type === 'user' ? styles.userBubble : styles.botBubble,
      ]}>
        <Text style={[
          styles.messageText,
          item.type === 'user' ? styles.userMessageText : styles.botMessageText,
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          item.type === 'user' ? styles.userTime : styles.botTime,
        ]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <Image source={{ uri: participant.avatar }} style={styles.avatar} />
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{participant.name}</Text>
          <Text style={styles.headerStatus}>{participant.status}</Text>
        </View>

        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="call-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input */}
      <ChatInputBar
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSend}
        onAttach={() => console.log('Attach image')}
        onMic={() => console.log('Voice message')}
      />
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
  },
  backButton: {
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  headerStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontFamily: FONTS.Poppins,
  },
  headerIcon: {
    padding: 8,
    marginLeft: 4,
  },
  messagesList: {
    flex: 1,
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
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  messageText: {
    fontSize: 15,
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
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
  },
  botTime: {
    color: '#999',
  },
});