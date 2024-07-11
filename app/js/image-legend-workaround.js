 $(document).ready(function() {
            function truncateText() {
                $('#imagesGrid .imgCon .meta.brief').each(function() {
                    var $this = $(this);
                    var html = $this.html();
                    var indexOfBr = html.indexOf('<br>');
                    if (indexOfBr !== -1) {
                        var beforeBr = html.substring(0, indexOfBr + 4); // Including the <br>
                        var afterBr = html.substring(indexOfBr + 4).trim();
                        var maxLength = 50;

                        if (afterBr.length > maxLength) {
                            var truncatedText = afterBr.substring(0, maxLength);
                            var lastSpaceIndex = truncatedText.lastIndexOf(' ');

                            if (lastSpaceIndex > -1) {
                                truncatedText = truncatedText.substring(0, lastSpaceIndex);
                            }

                            truncatedText += '...';
                            $this.html(beforeBr + truncatedText);
                            $this.attr('title', html);
                        }
                    }
                });
            }

            truncateText();

            function initMutationObserver() {
                var targetNode = document.getElementById('imagesGrid');
                if (!targetNode) return;

                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.addedNodes.length) {
                            truncateText();
                        }
                    });
                });

                var config = { childList: true, subtree: true };
                observer.observe(targetNode, config);
            }

            initMutationObserver();

        });
