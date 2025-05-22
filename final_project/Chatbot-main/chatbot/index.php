<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drippy Woo - AI Chat</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

	<script type="importmap">
		{
			"imports":{
				"@google/generative-ai":"https://esm.run/@google/generative-ai"
			}
		}
		</script>
</head>
<body style="background:url(background.png);">
        <!-- System Notification Modal -->
    <div id="system-modal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <span class="modal-icon"><i style="font-size:30px; color:white; text-shadow:0 0 100px white" class="fas fa-exclamation-circle"></i></span>
                <span class="modal-title">ALERT</span>
            </div>
            <div class="modal-message">
                <p>You have acquired the qualifications to be a <span class="highlight">User</span>. Will you accept?</p>
                <p>I only take yes for an answer</p>
            </div>
            <div class="modal-buttons">
                <button id="confirm-yes">Yes</button>
            </div>
        </div>
    </div>

    <div class="overlay-container">
        <!-- Left Side - Character Image -->
        <div class="character-container">
            <img src="../images/woo.png" alt="Drippy Woo" class="character-img">
            
        </div>
        
        <?php
            $suggestions = [
                "Who is your favorite shadow",
                "How does magic work in your world",
                "What is a system? How did it affect you",
                "Who do you like more Jin-ah or Chae Hae?",
                "Can you join my guild Mr. Drippy Woo",
                "How strong is Ashborn compared to you?",
                "What was your hardest battle?",
                "Do you ever miss your old life before awakening?",
                "If you could revive any hunter, who would it be?",
                "What do you think of Go Gun-Hee?",
                "Can you explain the different hunter ranks?",
                "How do shadow soldiers feel about being summoned?",
                "What was the most dangerous dungeon you faced?",
                "Would you ever train someone to be like you?",
                "If you fought yourself from the past, who would win?"
            ];
            shuffle($suggestions);
            $count=0;
        ?>

        <!-- Right Side - Chat Interface -->
        <div class="chat-container">
            <div class="chatbot-cont">
                <div class="chat-messages" id="chat-messages">
                    <!-- Chat messages appear here -->
                </div>
                <div class="example-questions">
                    <?php   
                        foreach ($suggestions as $suggestion) {
                            echo "<button>$suggestion</button>";
                            $count++; // Increment counter
                        
                            if ($count == 5) { // Stop after 5 sentences
                                break;
                            }
                        } 
                    ?>
                </div>
            </div>

            <!-- Input Area -->
            <div class="typing-cont">
                <textarea id="user-input" placeholder="Ask me something"></textarea>
                <button class="send-button" id="send-btn"></button>
            </div>
        </div>
    </div>

	<script type="module" src="mainmodule.js"></script>
	<script type="module" src="script.js"></script>
</body>
</html>
