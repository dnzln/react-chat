const initialState = {
    messages: [],
    isLoading: true,
    participants: 0,
    messagesTotal: 0,
    lastMessageAt: 0,
    userId: "id" + Math.random().toString(16).slice(2)
};

export default initialState;